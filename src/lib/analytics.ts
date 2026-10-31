import { site } from '../content/site'

type Params = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
    __hncReady?: boolean
  }
}

let started = false

/** Memuat GA4 & Meta Pixel (hanya bila ID diisi di content/site.ts), setelah halaman tampil. */
export function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true
  const { ga4Id, metaPixelId } = site.analytics
  const load = () => {
    if (ga4Id) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
      document.head.appendChild(s)
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', ga4Id)
    }
    if (metaPixelId) {
      /* Kode resmi Meta Pixel (diringkas) */
      const f = window
      if (!f.fbq) {
        const n = function (...args: unknown[]) {
          const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] }
          if (self.callMethod) self.callMethod(...args)
          else self.queue.push(args)
        } as unknown as NonNullable<Window['fbq']>
        n.push = n
        n.loaded = true
        n.version = '2.0'
        n.queue = []
        f.fbq = n
        const t = document.createElement('script')
        t.async = true
        t.src = 'https://connect.facebook.net/en_US/fbevents.js'
        document.head.appendChild(t)
      }
      f.fbq!('init', metaPixelId)
      f.fbq!('track', 'PageView')
    }
  }
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 3000 })
  else setTimeout(load, 1500)
}

/**
 * Catat event. Nama event (PRD §13):
 * klik_whatsapp, kirim_formulir, klik_petunjuk_arah, klik_instagram, scroll_75
 *
 * Setiap event dikirim DUA jalur: Pixel (browser) dan CAPI (/api/capi) dengan
 * `event_id` yang sama, sehingga Meta membuang duplikatnya (deduplication).
 * Kalau CAPI tidak dikonfigurasi, pengiriman itu gagal diam-diam — Pixel tetap
 * jalan, jadi tidak ada event yang hilang karena satu jalur mati.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
  const eventID = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  let mapped = event
  let custom = true
  if (event === 'kirim_formulir') {
    mapped = 'Lead'
    custom = false
  } else if (event === 'klik_whatsapp') {
    mapped = 'Contact'
    custom = false
  }

  if (window.fbq) {
    if (custom) window.fbq('trackCustom', mapped, params, { eventID })
    else window.fbq('track', mapped, params, { eventID })
    ;(window as unknown as { __hncEvents?: unknown[] }).__hncEvents ??= []
    ;(window as unknown as { __hncEvents: unknown[] }).__hncEvents.push({ event: mapped, params, eventID, ts: Date.now() })
  }

  void sendCapi(mapped, eventID, params)
  if (import.meta.env.DEV) console.info('[track]', mapped, params)
}

/** Kirim event yang sama lewat server (CAPI). Kegagalan tidak pernah melempar. */
async function sendCapi(eventName: string, eventID: string, params: Params) {
  try {
    const cookie = (n: string) =>
      document.cookie.split('; ').find((c) => c.startsWith(`${n}=`))?.split('=')[1]
    const body = {
      event_name: eventName,
      event_id: eventID,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: location.href,
      action_source: 'website',
      user_data: { fbp: cookie('_fbp'), fbc: cookie('_fbc') },
      custom_data: { ...params, page: location.pathname },
    }
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    })
  } catch {
    /* CAPI opsional: Pixel sudah mengirim event yang sama */
  }
}

let viewContentFired = false

/** ViewContent: sekali saja, saat blok penawaran masuk ~50% viewport. */
export function observeViewContent(selector = '[data-view-content]') {
  if (typeof window === 'undefined' || viewContentFired) return
  const el = document.querySelector(selector)
  if (!el) return
  if (!('IntersectionObserver' in window)) {
    track('ViewContent', { content_name: site.program.name })
    viewContentFired = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !viewContentFired) {
          viewContentFired = true
          track('ViewContent', {
            content_name: site.program.name,
            content_category: 'hydrotherapy',
            page: location.pathname,
          })
          io.disconnect()
        }
      }
    },
    { threshold: 0.5 },
  )
  io.observe(el)
}

/** Catat sekali ketika pengunjung men-scroll 75% halaman. */
export function trackScrollDepth() {
  if (typeof window === 'undefined') return
  let done = false
  const onScroll = () => {
    if (done) return
    const h = document.documentElement
    if ((h.scrollTop + innerHeight) / h.scrollHeight >= 0.75) {
      done = true
      track('scroll_75', { page: location.pathname })
      removeEventListener('scroll', onScroll)
    }
  }
  addEventListener('scroll', onScroll, { passive: true })
}
