/**
 * ============================================================
 *  PUSAT KONTEN WEBSITE HYDRO NEUROFORGE CENTER
 * ============================================================
 *  Semua teks, harga, jam, kontak, testimoni, FAQ ada di file ini.
 *  Untuk mengubah isi website cukup edit file ini saja —
 *  tidak perlu menyentuh file tampilan (komponen).
 *
 *  Catatan penulisan testimoni:
 *  - Tulis [[sensor]] untuk bagian yang harus diburamkan
 *    (nama anak, nama coach, nama tempat lain).
 *  - Jangan pernah menulis nama asli anak di file ini
 *    (repo ini bisa dilihat publik).
 * ============================================================
 */

export const site = {
  name: 'Hydro Neuroforge Center',
  shortName: 'Hydro Neuroforge',
  url: 'https://hydroneuroforge.io',
  tagline: 'Hydrotherapy for Special Needs',
  slogan: 'Magic of water, power of Neuroforge.',
  /** Deskripsi utama (hero beranda & footer) */
  description:
    'Terapi air yang membantu stimulasi sistem saraf pusat otak, meregulasi emosi, dan membantu perkembangan sensorik & motorik anak berkebutuhan khusus di Sport Club Danau Bogor Raya.',

  contact: {
    /** format internasional tanpa + dan tanpa spasi */
    whatsapp: '62881080219722',
    whatsappDisplay: '0881-0802-19722',
    instagram: 'hydro.neuroforge',
    instagramUrl: 'https://instagram.com/hydro.neuroforge',
  },

  location: {
    name: 'Sportclub Danau Bogor Raya',
    city: 'Bogor, Jawa Barat',
    lat: -6.597279,
    lng: 106.8292993,
    mapsUrl: 'https://maps.app.goo.gl/ziGrN19feyQCp44D7',
    /** embed tanpa API key */
    mapsEmbed:
      'https://maps.google.com/maps?q=-6.597279,106.8292993&z=16&hl=id&output=embed',
  },

  hours: {
    days: 'Setiap hari',
    time: '08.00 – 17.00 WIB',
    /** untuk data terstruktur Google */
    opens: '08:00',
    closes: '17:00',
  },

  /** Isi ID agar analitik aktif. Kosongkan ('') bila belum ada. */
  analytics: {
    ga4Id: '',
    metaPixelId: '',
  },

  /** Pesan otomatis saat orang tua menekan tombol WhatsApp biasa */
  waDefaultMessage:
    'Halo Hydro Neuroforge Center 👋\nSaya ingin konsultasi gratis tentang hydrotherapy untuk anak saya.',

  trust: {
    research: 'Berlandaskan riset Center on the Developing Child, Harvard University',
    researchShort: 'Berbasis riset Center on the Developing Child, Harvard University',
    umbrella: 'Di bawah naungan Association Aquatic of Sport Medicine (AASM)',
    partner: 'Partner resmi Yayasan Anak Spesial Indonesia',
  },

  program: {
    name: 'Program Hydrotherapy 1 on 1',
    price: 'Rp1.000.000',
    period: '/ bulan',
    perSession: 'Setara Rp250 ribu per sesi',
    includes: [
      '4 sesi privat per bulan (1× seminggu)',
      '60 menit per sesi',
      '1 anak : 1 terapis',
      'Materi disusun sesuai hasil observasi',
      'Termasuk tiket anak, dan gratis 1 tiket pengantar',
    ],
    note: 'Konsultasi via WhatsApp gratis. Observasi awal dilakukan tatap muka (berbayar) dan sudah termasuk sesi konsultasi langsung dengan tim kami.',
  },

  benefits: [
    {
      icon: 'brain',
      title: 'Integrasi Sistem Saraf Pusat',
      text: 'Gerak di dalam air memberi rangsangan menyeluruh yang membantu otak mengolah dan menyatukan informasi dari tubuh.',
    },
    {
      icon: 'heart',
      title: 'Fokus, Regulasi Emosi & Percaya Diri',
      text: 'Tekanan air yang lembut menenangkan. Anak belajar mengelola emosi, bertahan lebih lama pada tugas, dan bangga pada dirinya.',
    },
    {
      icon: 'sparkles',
      title: 'Stimulasi Sistem Sensorik',
      text: 'Suhu, tekanan, dan gerak air menstimulasi indra peraba, keseimbangan (vestibular), dan kesadaran tubuh (proprioseptif).',
    },
    {
      icon: 'move',
      title: 'Koordinasi Motorik',
      text: 'Daya apung mengurangi beban tubuh sehingga anak lebih leluasa melatih kekuatan, keseimbangan, dan koordinasi gerak.',
    },
  ],

  /** Contoh kondisi yang umum didampingi — silakan sesuaikan */
  conditions: [
    'Autisme (ASD)',
    'ADHD',
    'Keterlambatan perkembangan',
    'Gangguan sensorik',
    'Speech delay',
    'Down syndrome',
    'Cerebral palsy',
  ],

  steps: [
    {
      title: 'Buat janji via WhatsApp',
      text: 'Ceritakan kondisi si kecil. Konsultasi awal lewat WhatsApp gratis, tanpa kewajiban.',
    },
    {
      title: 'Observasi & penentuan materi',
      text: 'Pertemuan tatap muka di kolam untuk mengenal anak dan menyusun materi yang tepat. Sudah termasuk sesi konsultasi gratis.',
    },
    {
      title: 'Sesi rutin dimulai',
      text: 'Sesi privat 1 on 1 selama 60 menit, seminggu sekali, dengan perkembangan yang dipantau bersama orang tua.',
    },
  ],

  method: {
    title: 'Air yang menenangkan, otak yang bertumbuh',
    paragraphs: [
      'Program kami berlandaskan riset Center on the Developing Child, Harvard University tentang perkembangan otak anak: koneksi saraf terbentuk dan menguat lewat pengalaman yang berulang, hubungan yang hangat, dan lingkungan yang aman.',
      'Air adalah ruang belajar yang unik. Daya apung, tekanan, dan suhunya memberi rangsangan sensorik yang kaya sekaligus menenangkan, sehingga anak lebih siap menerima stimulasi dan melatih kemampuan barunya, satu langkah kecil setiap minggu.',
    ],
    pillars: [
      { k: '1 : 1', v: 'Satu anak, satu terapis' },
      { k: '60′', v: 'Durasi tiap sesi' },
      { k: '2–17', v: 'Rentang usia (tahun)' },
    ],
  },

  testimonials: {
    note: 'Testimoni asli dari orang tua. Identitas disamarkan untuk menjaga privasi anak.',
    /**
     * Isi chat disalin apa adanya dari tangkapan layar asli (ejaan tidak dirapikan).
     * from: 'them' = orang tua, 'me' = admin Hydro Neuroforge
     * divider = penanda hari ala WhatsApp, video = gelembung video (thumbnail diburamkan)
     */
    chats: [
      {
        caption: 'Orang tua dari N.',
        clock: '10.41',
        messages: [
          { from: 'them', text: 'Saya sudah sampekan ke coach yoga, utk materi lower body nya ditambah', time: '17.11' },
          { from: 'them', text: 'Besok saya update lagi 🙏🏻', time: '17.11' },
          { from: 'me', text: 'Siapp bunda, kita tunggu info selanjutnya', time: '17.11' },
          { from: 'them', text: 'Tadi dapat laporan dari terapist yg di [[sensor]], progres level adaptasi [[sensor]] meningkat', time: '17.12' },
          { from: 'them', text: 'Jauh lebih kooperatif', time: '17.12' },
          { from: 'them', text: 'Dan cepat diarahkan nya', time: '17.13' },
        ],
      },
      {
        caption: 'Orang tua murid (awalnya takut air)',
        clock: '20.41',
        messages: [
          { from: 'them', text: 'Bu [[sensor]] malam² mintaaa renang 😁', time: '20.38' },
          { from: 'them', text: 'Mendadak di pompaaa 😁', time: '20.38' },
          { from: 'them', text: 'Kata a mamah air mamah', time: '20.38' },
          { from: 'them', text: 'Seneng bngt bu', time: '20.38' },
          { from: 'them', text: 'Berkah [[sensor]] ini hebat', time: '20.39' },
          { from: 'me', text: 'Kerenn banget mam, cepet banget adaptasinya samaa air', time: '20.39' },
          { from: 'them', text: 'Yg tadi a takut bngt JD seneng bngt ma air', time: '20.39' },
        ],
      },
      {
        caption: 'Orang tua dari D.',
        clock: '06.35',
        messages: [
          { from: 'them', video: '0:56', time: '06.32' },
          { from: 'them', text: 'Semenjak moronya lebih tenang, [[sensor]] udh mulai bisa baca', time: '06.33' },
        ],
      },
      {
        caption: 'Orang tua murid',
        clock: '18.55',
        messages: [
          { from: 'them', text: 'Liat di video sih bagus ya mas , sampai terharu 🥹', time: '18.53' },
          { from: 'them', text: 'Emang anaknya suka main air kan', time: '18.53' },
          { from: 'them', text: 'Jadi skrg drmh kurang mainin airnya', time: '18.53' },
          { from: 'me', text: 'Iya bu, pinter banget sekarang udah gapernah marah2 dikolam juga, udah bisa ambil nafas sama water trap dikolam dalem', time: '18.54' },
        ],
      },
      {
        caption: 'Orang tua dari Z.',
        clock: '11.45',
        messages: [
          { from: 'them', text: 'Iya mas baik sehabis Fisioteraphy ya mas', time: '20.06' },
          { from: 'me', text: 'Betul kak', time: '20.07' },
          { divider: 'Hari ini' },
          { from: 'them', text: 'Perkembangan [[sensor]] hari hari udh bisa menyesuaikan warna , udh mau natap lamaa…', time: '11.44' },
        ],
      },
      {
        caption: 'Orang tua murid',
        clock: '16.33',
        messages: [
          { from: 'them', text: 'Alhamdulillah banyak perkembangan nya min', time: '16.31' },
          { from: 'them', text: 'Dan udah mulai berani di kolam orang dewasa walaupun nangis tapi dia jalanin', time: '16.32' },
        ],
      },
    ],
    posters: ['testimoni-1', 'testimoni-2', 'testimoni-3'],
  },

  /** Foto ditampilkan utuh (tidak dipotong). Wajah anak wajib sudah diburamkan. */
  gallery: [
    { img: 'suasana-kolam-1', alt: 'Kolam renang Sportclub Danau Bogor Raya dengan pohon kelapa' },
    { img: 'kegiatan-terapi-1', alt: 'Terapis mendampingi anak berlatih mengapung di kolam yang asri' },
    { img: 'kegiatan-terapi-2', alt: 'Terapis berinteraksi dengan anak di tepi kolam' },
    { img: 'foto-k1-top', alt: 'Terapis mendampingi anak berlatih meluncur dengan pool noodle' },
  ],

  faq: [
    {
      q: 'Anak saya takut air, apakah tetap bisa ikut?',
      a: 'Bisa. Banyak anak kami awalnya takut air. Terapis memulai dengan pengenalan bertahap: bermain di tepi, menyentuh air, lalu masuk perlahan, mengikuti kesiapan anak tanpa paksaan.',
    },
    {
      q: 'Bagaimana alur untuk mulai?',
      a: 'Hubungi kami via WhatsApp untuk konsultasi gratis. Setelah itu kita jadwalkan observasi untuk mengenal anak dan menentukan materi. Sesi rutin dimulai setelah observasi.',
    },
    {
      q: 'Berapa biayanya?',
      a: 'Paket rutin Rp1.000.000 per bulan untuk 4 sesi privat 1 on 1 (seminggu sekali, 60 menit). Biaya observasi awal akan kami informasikan via WhatsApp.',
    },
    {
      q: 'Usia berapa yang bisa ikut?',
      a: 'Anak usia 2 sampai 17 tahun. Kesesuaian program untuk tiap anak ditentukan saat observasi.',
    },
    {
      q: 'Apakah aman? Bagaimana pengawasannya?',
      a: 'Setiap sesi bersifat 1 on 1. Satu terapis fokus mendampingi satu anak sepanjang sesi, dengan alat bantu apung sesuai kebutuhan.',
    },
    {
      q: 'Apakah bisa dikombinasikan dengan terapi lain?',
      a: 'Bisa. Hydrotherapy bersifat pendukung dan dapat berjalan berdampingan dengan terapi lain seperti fisioterapi, okupasi, atau terapi wicara.',
    },
    {
      q: 'Apa yang perlu dibawa?',
      a: 'Baju renang, handuk, baju ganti, dan perlengkapan pribadi anak. Detailnya akan kami kirimkan setelah jadwal disepakati.',
    },
    {
      q: 'Kapan perkembangan mulai terlihat?',
      a: 'Setiap anak berbeda. Banyak orang tua melihat perubahan kecil, seperti lebih tenang dan lebih kooperatif, dalam beberapa minggu. Konsistensi sesi mingguan adalah kuncinya.',
    },
  ],

  /** Pilihan di formulir */
  form: {
    diagnoses: [
      'Autisme (ASD)',
      'ADHD',
      'Keterlambatan perkembangan (GDD)',
      'Gangguan sensorik (SPD)',
      'Speech delay',
      'Down syndrome',
      'Cerebral palsy',
      'Belum ada diagnosa',
      'Lainnya',
    ],
    minAge: 2,
    maxAge: 17,
  },

  disclaimer:
    'Hydrotherapy merupakan terapi pendukung dan tidak menggantikan diagnosis maupun penanganan dari dokter atau tenaga medis.',
} as const

export type Site = typeof site
