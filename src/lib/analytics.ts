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
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
  if (window.fbq) {
    if (event === 'kirim_formulir') window.fbq('track', 'Lead', params)
    else if (event === 'klik_whatsapp') window.fbq('track', 'Contact', params)
    else window.fbq('trackCustom', event, params)
  }
  if (import.meta.env.DEV) console.info('[track]', event, params)
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
