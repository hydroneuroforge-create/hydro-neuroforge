/**
 * ============================================================
 *  ISI VIDEO MOTION GRAPHIC (ubah teks & foto di sini saja)
 * ============================================================
 *  - Jangan memakai tanda pisah panjang (—). Tulis "1 on 1".
 *  - Foto anak WAJIB sudah diburamkan wajahnya (taruh di public/img/).
 *  - Setelah mengubah, render ulang: lihat README.md.
 */
export const content = {
  brand: { line1: 'HYDRO', line2: 'NEUROFORGE', line3: 'CENTER' },

  title: { top: 'HYDROTHERAPY', mid: 'FOR', bottom: 'SPECIAL NEEDS' },

  /** Foto kiri & kanan logo di adegan judul */
  titlePhotos: ['img/foto-noodle.jpg', 'img/foto-meluncur.jpg'],

  suasana: {
    big: 'img/foto-kolam.jpg',
    small1: 'img/foto-peluk.jpg',
    small2: 'img/foto-pelampung.jpg',
    caption: 'Sportclub Danau Bogor Raya',
  },

  benefitsTitle: 'MANFAAT HYDROTHERAPY',
  benefits: [
    { text: 'INTEGRASI SISTEM SARAF PUSAT OTAK', icon: 'brain', photo: 'img/foto-terapi-apung.jpg', focus: '50% 80%' },
    { text: 'MENINGKATKAN FOKUS, REGULASI EMOSI & KEPERCAYAAN DIRI', icon: 'heart', photo: 'img/foto-terapi-tepi.jpg', focus: '50% 35%' },
    { text: 'STIMULASI SISTEM SENSORIK', icon: 'sparkles', photo: 'img/foto-meluncur.jpg', focus: '60% 50%' },
    { text: 'KOORDINASI MOTORIK', icon: 'move', photo: 'img/foto-pelampung.jpg', focus: '55% 50%' },
  ],

  cta: {
    line1: 'Konsultasi',
    line2: 'GRATIS',
    line3: 'via WhatsApp',
    whatsapp: '0881-0802-19722',
    location: 'Sportclub Danau Bogor Raya',
    city: 'Bogor, Jawa Barat',
    hours: 'Setiap hari, 08.00 – 17.00 WIB',
  },

  end: {
    slogan: 'Magic of water, power of Neuroforge.',
    website: 'hydroneuroforge.io',
    instagram: '@hydro.neuroforge',
  },
} as const
