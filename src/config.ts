// ============================================================
//  KONFIGURASI PUSAT — Edit di sini untuk mengubah info kontak
// ============================================================

// Ganti dengan nomor WhatsApp resmi (format internasional, tanpa + atau spasi)
// Contoh: 62 untuk Indonesia -> 6281234567890
export const WHATSAPP_NUMBER = '62881080219722'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Halo Hydro Neuroforge Center, saya ingin bertanya tentang pendaftaran terapi untuk anak saya.'

export const INSTAGRAM_HANDLE = 'hydro.neuroforge'
export const INSTAGRAM_URL = 'https://www.instagram.com/hydro.neuroforge'

export const LOCATION_NAME = 'Sportclub Danau Bogor Raya'
export const LOCATION_FULL =
  'Hydro Neuroforge Center, Sportclub Danau Bogor Raya, Bogor, Jawa Barat'

// Embed Google Maps (pencarian lokasi). Bisa diganti dengan embed resmi nanti.
export const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Hydro+Neuroforge+Center+Sportclub+Danau+Bogor+Raya&output=embed'
export const MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=Hydro+Neuroforge+Center+Sportclub+Danau+Bogor+Raya'

export const BRAND = {
  name: 'Hydro Neuroforge Center',
  shortName: 'Hydro Neuroforge',
  tagline: 'Menempa Potensi, Merawat Harapan',
  founder: 'Syaif Rahid Safauzan',
  foundedYear: 2025,
}

export function buildWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
