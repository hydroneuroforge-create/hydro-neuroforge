/**
 * Vercel Serverless Function: Meta Conversions API (CAPI) untuk website Hydro.
 *
 * Dipanggil dari browser (same-origin) setiap kali ada event yang juga
 * dikirim Pixel. `event_id` WAJIB sama dengan yang dikirim Pixel supaya Meta
 * membuang duplikatnya (deduplication).
 *
 * Variabel lingkungan yang dibutuhkan (set di dashboard Vercel, JANGAN di repo):
 *   META_PIXEL_ID      2615749505536963
 *   META_CAPI_TOKEN    token dari Events Manager → Settings → Conversions API
 *   META_TEST_EVENT_CODE  (opsional, hanya saat menguji di Test Events)
 */

type Body = {
  event_name?: string
  event_id?: string
  event_time?: number
  event_source_url?: string
  action_source?: string
  user_data?: Record<string, string | undefined>
  custom_data?: Record<string, unknown>
}

const PIXEL_ID = process.env.META_PIXEL_ID
const TOKEN = process.env.META_CAPI_TOKEN
const TEST_CODE = process.env.META_TEST_EVENT_CODE

/** Ambil IP asli pengunjung dari header proxy Vercel. */
function clientIp(req: { headers: Record<string, string | string[] | undefined> }): string | undefined {
  const raw = req.headers['x-forwarded-for'] ?? req.headers['x-real-ip']
  const v = Array.isArray(raw) ? raw[0] : raw
  return v ? v.split(',')[0].trim() : undefined
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'POST only' })
    return
  }
  if (!PIXEL_ID || !TOKEN) {
    // Sengaja tidak membocorkan konfigurasi ke browser, tapi tetap terlihat di log.
    console.error('[capi] META_PIXEL_ID / META_CAPI_TOKEN belum diset')
    res.status(503).json({ ok: false, error: 'not configured' })
    return
  }

  let body: Body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    res.status(400).json({ ok: false, error: 'bad json' })
    return
  }

  const name = body?.event_name
  if (!name || !/^[A-Za-z_]{2,40}$/.test(name)) {
    res.status(400).json({ ok: false, error: 'bad event_name' })
    return
  }

  const userData: Record<string, unknown> = {}
  const ud = body.user_data ?? {}
  if (ud.fbp) userData.fbp = ud.fbp
  if (ud.fbc) userData.fbc = ud.fbc
  if (ud.email) userData.em = [ud.email]
  if (ud.phone) userData.ph = [ud.phone]
  const ip = clientIp(req)
  if (ip) userData.client_ip_address = ip
  const ua = req.headers['user-agent']
  if (ua) userData.client_user_agent = Array.isArray(ua) ? ua[0] : ua

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: name,
        event_time: body.event_time ?? Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.event_source_url,
        action_source: body.action_source ?? 'website',
        user_data: userData,
        custom_data: body.custom_data ?? {},
      },
    ],
  }
  if (TEST_CODE) payload.test_event_code = TEST_CODE

  try {
    const r = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    )
    const out = await r.json()
    if (!r.ok) {
      console.error('[capi] meta error', r.status, JSON.stringify(out).slice(0, 500))
      res.status(502).json({ ok: false, error: 'meta rejected', detail: out })
      return
    }
    res.status(200).json({ ok: true, received: out?.events_received ?? 0, fbtrace_id: out?.fbtrace_id })
  } catch (e) {
    console.error('[capi] fetch failed', String(e))
    res.status(500).json({ ok: false, error: 'fetch failed' })
  }
}
