import { site } from '../content/site'

const REF_KEY = 'hnc-ref'

/** Simpan sumber kunjungan (UTM dari iklan) agar ikut tercatat di pesan WA. */
export function captureRef() {
  if (typeof window === 'undefined') return
  try {
    const q = new URLSearchParams(window.location.search)
    const src = q.get('utm_source')
    if (src) {
      const ref = [src, q.get('utm_campaign'), q.get('v')].filter(Boolean).join('-')
      sessionStorage.setItem(REF_KEY, ref.slice(0, 40))
    }
  } catch {
    /* abaikan */
  }
}

function getRef(): string {
  try {
    return sessionStorage.getItem(REF_KEY) ?? ''
  } catch {
    return ''
  }
}

export function waUrl(message: string = site.waDefaultMessage) {
  const ref = typeof window === 'undefined' ? '' : getRef()
  const text = ref ? `${message}\n\n(ref: ${ref})` : message
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`
}

/** URL tanpa pesan — dipakai saat render server (sebelum JS aktif). */
export const waUrlStatic = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.waDefaultMessage)}`

export interface FormData {
  parent: string
  child: string
  age: string
  diagnosis: string
  concern: string
}

export function formMessage(d: FormData) {
  return [
    `Halo ${site.name} 👋`,
    'Saya ingin membuat janji observasi hydrotherapy.',
    '',
    `• Nama orang tua: ${d.parent.trim()}`,
    `• Nama anak: ${d.child.trim()}`,
    `• Usia anak: ${d.age} tahun`,
    `• Diagnosa: ${d.diagnosis.trim()}`,
    `• Kekhawatiran: ${d.concern.trim()}`,
    '',
    '(dikirim dari website)',
  ].join('\n')
}
