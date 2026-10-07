# PRD — Website Hydro Neuroforge Center

| | |
|---|---|
| **Versi** | 1.0 (draf untuk disetujui) |
| **Tanggal** | 7 Oktober 2026 |
| **Domain** | `hydroneuroforge.io` (preview awal di Vercel) |
| **Bahasa** | Indonesia saja |
| **Status** | Menunggu persetujuan pemilik |

---

## 1. Ringkasan

Website untuk **Hydro Neuroforge Center**, layanan *hydrotherapy* 1-on-1 untuk anak berkebutuhan khusus usia 2–17 tahun di Sportclub Danau Bogor Raya.

Website punya dua halaman utama:
1. **Beranda (`/`)**, tempat membangun brand. Konsepnya *scroll-diving* 3D: saat di-scroll, pengunjung seolah turun dari permukaan kolam ke dasar, dan setiap bagian isi muncul di kedalaman yang berbeda.
2. **Landing page iklan (`/hydrotherapy`)**, halaman ringkas dan cepat yang fokus agar pengunjung chat WhatsApp. Halaman ini siap dipakai sebagai tujuan iklan Meta/Instagram dan Google.

**Prinsip utama:** pada 3 detik pertama orang tua sudah terkesan, tetapi situs tetap ringan di HP Android kelas menengah.

---

## 2. Tujuan & Indikator Keberhasilan

| Tujuan | Indikator (KPI) | Target awal |
|---|---|---|
| Orang tua menghubungi via WhatsApp | Klik tombol WA dan kirim formulir per pengunjung | ≥ 5% di landing page, ≥ 2% di beranda |
| Branding: terlihat profesional dan tepercaya | Waktu rata-rata di beranda | ≥ 60 detik |
| Siap untuk iklan | Kecepatan landing page di HP (Lighthouse Mobile) | Performance ≥ 90, LCP < 2,5 dtk di 4G |
| Ditemukan di Google | Peringkat untuk kata kunci lokal | "hydrotherapy anak bogor", "terapi ABK bogor", "terapi neurosensori anak bogor" |

---

## 3. Pengguna Sasaran

**Persona utama: orang tua anak berkebutuhan khusus (ABK)**
- Usia sekitar 28–45 tahun, domisili Bogor, Jabodetabek, dan sekitarnya.
- Membuka website **dari HP** (≥ 90%), sering dari iklan Instagram/Facebook atau tautan WhatsApp.
- Kondisi emosional: lelah, penuh harapan, waspada terhadap klaim berlebihan. Yang mereka cari adalah **bukti nyata, rasa aman, dan kejelasan** (biaya, alur, lokasi).
- Pertanyaan di benak mereka: *"Apakah cocok untuk anak saya? Aman tidak? Berapa biayanya? Di mana? Bagaimana mulainya?"*

---

## 4. Fakta Bisnis (Sumber Kebenaran Konten)

| Item | Isi |
|---|---|
| Nama di web | **Hydro Neuroforge Center** (logo tetap memakai file asli) |
| Layanan | Hydrotherapy for Special Needs, 1-on-1 dengan terapis |
| Usia | 2–17 tahun |
| Durasi | 60 menit per sesi |
| Paket | **Rp1.000.000 / bulan** untuk 4 sesi (1× per minggu) |
| Alur | 1) Buat janji via WhatsApp → 2) Jadwal observasi & penentuan materi → 3) Sesi rutin dimulai |
| Dasar metode | Berlandaskan riset *Center on the Developing Child, Harvard University* (teks saja, tanpa logo) |
| Naungan | Association Aquatic of Sport Medicine (AASM) |
| Partner resmi | Yayasan Anak Spesial Indonesia |
| Manfaat | Integrasi sistem saraf pusat otak · Fokus, regulasi emosi & kepercayaan diri · Stimulasi sistem sensorik · Koordinasi motorik |
| Lokasi | Sportclub Danau Bogor Raya (satu-satunya lokasi) |
| Koordinat | -6.597279, 106.8292993 · [Google Maps](https://maps.app.goo.gl/ziGrN19feyQCp44D7) |
| Jam operasional | 08.00–17.00 WIB |
| WhatsApp | 0881-0802-19722 → `wa.me/62881080219722` |
| Instagram | [@hydro.neuroforge](https://instagram.com/hydro.neuroforge) |

**Tidak ditampilkan:** nama atau foto coach/terapis, "JBC", dan logo Harvard.

### Rekomendasi harga: **tampilkan**
Alasannya:
- Pengunjung dari iklan cenderung pergi kalau harga tidak jelas.
- Harga yang terlihat menyaring calon klien yang benar-benar serius, sehingga admin WA tidak habis waktu untuk pertanyaan harga.
- Rp1 juta untuk 4 sesi privat 1-on-1 adalah harga yang wajar dan layak dibanggakan.

Cara penyajian: **"Rp1.000.000 / bulan"** dengan rincian *"4 sesi privat · 60 menit · 1-on-1 · ≈ Rp250 ribu per sesi"*. Harga ditaruh **setelah** bagian manfaat dan bukti, bukan di awal.

---

## 5. Peta Situs

| URL | Fungsi | Navigasi |
|---|---|---|
| `/` | Beranda, branding dan pengalaman 3D penuh | Menu lengkap |
| `/hydrotherapy` | Landing page iklan, fokus konversi | **Tanpa menu** (hanya logo + tombol WA), untuk mengurangi distraksi |
| `/kebijakan-privasi` | Kebijakan privasi singkat (formulir memuat data diagnosis anak; mengikuti UU PDP No. 27/2022) | Tautan di footer |
| `404` | Halaman tidak ditemukan bertema "tersesat di kolam" + tombol kembali | — |

Elemen di semua halaman:
- **Tombol WhatsApp melayang** di pojok kanan bawah.
- **Bar CTA lengket** di bawah layar HP ("Konsultasi Gratis via WhatsApp"), muncul setelah scroll melewati hero.
- **Tombol Mode Tenang** di header/footer.

---

## 6. Konsep 3D: "Menyelam Bersama Anak"

Cerita visualnya: pengunjung masuk dari **permukaan air yang berkilau**, lalu perlahan **menyelam** saat di-scroll. Cahaya matahari menembus air (*god rays*), pola riak cahaya (*caustics*) bergerak, dan gelembung naik. Simbol otak dari logo melayang di dalam air seperti sedang "dibentuk" (sesuai kata *forge*). Di akhir, pengunjung **naik kembali ke permukaan**, tepat di ajakan chat WhatsApp. Maknanya: anak menjadi lebih percaya diri.

| Kedalaman | Bagian | Efek 3D / animasi |
|---|---|---|
| Permukaan | Hero | Permukaan air shader yang beriak, bereaksi terhadap sentuhan/geser jari; logo otak 3D melayang; judul muncul huruf demi huruf |
| −1 m | Masalah & empati | Kamera menembus permukaan, warna berubah dari biru muda ke teal; gelembung naik |
| −2 m | 4 Manfaat | Empat "gelembung" kartu mengapung, masing-masing ikon 3D sederhana (otak, hati, tangan, gelombang) |
| −3 m | Metode & dasar riset | Jaringan saraf bercahaya (partikel terhubung) di dalam air, melambangkan neuroplastisitas |
| −4 m | Alur 3 langkah | Garis jalur bercahaya yang "digambar" seiring scroll |
| Dasar | Program & harga | Kartu harga di "dasar kolam" dengan caustics di atasnya |
| Naik | Testimoni | Kamera naik perlahan; chat testimoni muncul seperti pesan masuk |
| Permukaan lagi | CTA + formulir + peta | Kembali ke permukaan yang cerah, berkesan "berhasil" |

### Aturan agar tetap ringan
- **Satu kanvas WebGL** untuk seluruh halaman (bukan satu kanvas per bagian). Konten teks adalah HTML biasa di atasnya, sehingga tetap terbaca Google dan pembaca layar.
- Efek air, caustics, dan god rays dibuat dengan **shader prosedural**, tanpa video atau tekstur besar.
- Logo 3D = SVG logo yang di-*extrude* (≤ 30 KB). Tidak ada model GLTF besar.
- **Total muatan 3D ≤ 250 KB (gzip)** dan dimuat *setelah* hero HTML tampil. Pengunjung langsung melihat konten; 3D menyusul dalam milidetik.
- **Penyesuaian otomatis per perangkat** (deteksi kemampuan GPU):
  - *Tinggi:* semua efek, partikel penuh.
  - *Menengah (mayoritas HP Android):* resolusi render dikurangi, partikel dikurangi 50%.
  - *Rendah:* gambar diam bergradasi + animasi CSS. Tampilan tetap cantik, tanpa WebGL.
- Render berhenti saat tab tidak aktif atau kanvas tidak terlihat; frame rate dibatasi untuk menghemat baterai.
- Landing page `/hydrotherapy` memakai **3D versi ringan** (hanya hero permukaan air) demi kecepatan dari iklan.

### Mode Tenang
- Default: **tampilan memukau** (sesuai permintaan).
- Otomatis aktif hanya bila HP pengunjung sudah disetel "kurangi gerakan" (*prefers-reduced-motion*).
- Bisa diaktifkan manual lewat tombol 🌙 "Mode Tenang". Animasi dan gerakan kamera berhenti, warna dilembutkan, dan pilihan diingat untuk kunjungan berikutnya.

---

## 7. Beranda (`/`): Rincian Bagian

1. **Header**: logo, menu (Manfaat · Program · Testimoni · Lokasi), tombol "Chat WA". Di HP, menu menjadi ikon hamburger.
2. **Hero**
   - Judul: **"Hydrotherapy for Special Needs"**
   - Sub-judul: *"Terapi air 1-on-1 untuk membantu perkembangan otak, emosi, dan motorik anak berkebutuhan khusus usia 2–17 tahun."*
   - Lencana kepercayaan: *Berlandaskan riset Center on the Developing Child, Harvard University · Di bawah naungan AASM · Partner resmi Yayasan Anak Spesial Indonesia*
   - CTA utama: **"Konsultasi Gratis via WhatsApp"** · CTA kedua: "Lihat Program"
3. **Empati**: *"Setiap anak punya caranya sendiri untuk tumbuh."* Paragraf singkat bahwa air memberi rasa aman, daya apung, dan stimulasi sensorik alami.
4. **4 Manfaat**: kartu interaktif dengan penjelasan 1–2 kalimat.
5. **Untuk siapa**: usia 2–17 tahun. Contoh kondisi yang umum ditangani, misalnya autisme, ADHD, keterlambatan perkembangan, gangguan sensorik, dan Down syndrome. Disertai catatan *"Cocok atau tidaknya ditentukan saat observasi."* → **perlu konfirmasi pemilik (lihat §14)**.
6. **Metode & dasar riset**: penjelasan neuroplastisitas dan pentingnya stimulasi pada masa perkembangan, dikaitkan dengan riset Center on the Developing Child, Harvard University.
7. **Alur 3 langkah**: Buat janji via WA → Observasi & penentuan materi → Sesi rutin mingguan.
8. **Program & harga**: satu kartu paket (lihat §4).
9. **Testimoni**: lihat §10.
10. **Galeri suasana**: foto kolam Danau Bogor Raya dan foto kegiatan, ditampilkan sebagai slider geser di HP.
11. **Naungan & partner**: logo AASM dan Yayasan Anak Spesial Indonesia (diambil dari poster; **lebih baik pakai file logo asli**).
12. **FAQ** (akordeon), usulan pertanyaan:
    - Anak saya takut air, apakah bisa ikut?
    - Apakah orang tua boleh mendampingi?
    - Apa yang perlu dibawa?
    - Bagaimana jika anak sakit atau berhalangan?
    - Apakah aman? Bagaimana pengawasannya?
    - Apakah bisa dikombinasikan dengan terapi lain (fisioterapi, okupasi, wicara)?
    - Berapa lama sampai terlihat perkembangan?

    → **Jawaban perlu disetujui pemilik**
13. **Formulir pendaftaran**: lihat §9.
14. **Lokasi**: peta Google Maps (dimuat saat terlihat), alamat, jam 08.00–17.00, tombol "Petunjuk Arah".
15. **CTA penutup**: *"Langkah kecil hari ini, lompatan besar untuk si kecil."* + tombol WA.
16. **Footer**: logo, kontak, Instagram, jam, tautan kebijakan privasi, disclaimer medis singkat.

---

## 8. Landing Page Iklan (`/hydrotherapy`)

Dibuat untuk pengunjung "dingin" dari iklan. Satu tujuan saja: **chat WhatsApp**.

Urutan (mengikuti pola AIDA):
1. **Hero ringkas**: headline + sub-headline + tombol WA, semuanya terlihat tanpa scroll di layar HP.
   - Headline: *"Anak Lebih Tenang, Fokus & Percaya Diri Lewat Terapi Air"*
   - Sub-headline: *"Hydrotherapy 1-on-1 untuk anak berkebutuhan khusus usia 2–17 tahun di Bogor."*
2. **Bukti cepat**: 3 lencana (Riset Harvard Center on the Developing Child · Naungan AASM · Partner Yayasan Anak Spesial Indonesia).
3. **4 Manfaat** dalam format ikon ringkas.
4. **Testimoni**: 3 chat (lihat §10).
5. **Alur 3 langkah**.
6. **Harga** + kalimat penguat: *"Observasi awal untuk menentukan materi yang sesuai dengan kebutuhan anak."*
7. **Formulir WA** (§9).
8. **FAQ singkat** (4 pertanyaan teratas).
9. **Lokasi & jam**.
10. **CTA akhir**.

Selain itu:
- Bar CTA lengket di bawah layar.
- Tanpa menu navigasi.
- Mendukung **parameter UTM** (`?utm_source=instagram&utm_campaign=...`). Sumber iklan ikut tercatat di analytics dan ditambahkan secara halus ke pesan WA (mis. kode `[IG]`), sehingga Anda tahu iklan mana yang menghasilkan chat.
- Bisa dibuat **varian** dengan URL berbeda untuk A/B test headline, misalnya `/hydrotherapy?v=b`.

---

## 9. Formulir Pendaftaran → WhatsApp

Formulir **tidak menyimpan data di server**. Saat dikirim, aplikasi WhatsApp terbuka dengan pesan yang sudah terisi, ditujukan ke `62881080219722`.

| Field | Tipe | Wajib | Validasi |
|---|---|---|---|
| Nama orang tua | teks | ✅ | min. 2 karakter |
| Nama anak | teks | ✅ | min. 2 karakter (nama panggilan boleh) |
| Usia anak | pilihan 2–17 tahun | ✅ | — |
| Diagnosa | pilihan + "Lainnya" (isian bebas) + "Belum ada diagnosa" | ✅ | — |
| Kekhawatiran orang tua | teks panjang | ✅ | maks. 500 karakter |

Templat pesan:
```
Halo Hydro Neuroforge Center 👋
Saya ingin membuat janji observasi hydrotherapy.

• Nama orang tua: {nama_ortu}
• Nama anak: {nama_anak}
• Usia anak: {usia} tahun
• Diagnosa: {diagnosa}
• Kekhawatiran: {kekhawatiran}

(dikirim dari website)
```
- Ada catatan kecil di bawah formulir: *"Data hanya dikirim ke WhatsApp kami dan tidak disimpan di website."*
- Tombol WA biasa (tanpa formulir) membuka pesan pendek: *"Halo, saya ingin konsultasi hydrotherapy untuk anak saya."*

---

## 10. Testimoni: Asli, Disamarkan, Terlihat Nyata

**Prinsip:** hanya memakai testimoni **asli** dari poster yang Anda kirim. Tidak boleh ada testimoni yang dikarang.

**Cara penyajian agar terlihat autentik:**
- Dibuat ulang sebagai **tampilan chat WhatsApp asli** (HTML/CSS): wallpaper khas WA, gelembung abu/hijau, jam, centang biru, status bar HP. Hasilnya tajam di semua layar, beda dengan screenshot yang buram.
- **Nama kontak & foto profil diburamkan** (efek blur seperti sensor di screenshot asli). Nama anak ditulis dengan **inisial**, sedangkan nama coach dan "JBC" diganti blok sensor ▇▇▇. Gaya penyamaran ini justru menambah kesan asli.
- Ejaan, singkatan, dan emoji **dibiarkan apa adanya**. Tidak dirapikan, karena bahasa natural terasa jujur.
- Chat muncul berurutan dengan animasi "sedang mengetik…" saat discroll ke bagian testimoni.
- Di bawahnya ditampilkan **poster testimoni asli** (versi yang disensor) dalam galeri yang bisa diperbesar, sebagai bukti tambahan.
- Label kecil: *"Testimoni asli orang tua. Identitas disamarkan untuk menjaga privasi anak."*

**Transkrip testimoni yang akan dipakai** (dari poster, sudah disamarkan):

1. **Ortu dari N.**: *"Tadi dapat laporan dari terapist yg di ▇▇▇, progres level adaptasi N. meningkat" · "Jauh lebih kooperatif" · "Dan cepat diarahkan nya"*
2. **Ortu (anak takut air)**: *"Bu ▇▇▇ malam² mintaa renang 😁" · "Mendadak di pompaaa 😁" · "Seneng bngt bu" · "Yg tadi a takut bngt JD seneng bngt ma air"*
3. **Ortu dari Z.**: *"Perkembangan Z. hari hari udh bisa menyesuaikan warna, udh mau natap lamaa…"*
4. **Ortu (kolam dewasa)**: *"Dan udah mulai berani di kolam orang dewasa walaupun nangis tapi dia jalanin" · "Alhamdulillah banyak perkembangan nya min"*
5. **Ortu dari D.**: *"Semenjak moronya lebih tenang, D. udh mulai bisa baca"* + *"Liat di video sih bagus ya mas, sampai terharu 🥹"*

**Video:** karena wajah anak terlihat jelas, video **tidak dipakai di versi pertama**. Opsi untuk nanti:
- (a) Potongan video yang memperlihatkan anak dari belakang, kaki/tangan di air, atau dari bawah air.
- (b) Wajah diburamkan secara otomatis saat proses editing.
- (c) Video dengan izin tertulis orang tua.

---

## 11. Pedoman Konten & Klaim

- Klaim Harvard ditulis sebagai **"Berlandaskan riset Center on the Developing Child, Harvard University"**. Hindari kata yang mengesankan afiliasi/sertifikasi resmi dari Harvard (mis. "bekerja sama dengan" atau "disertifikasi oleh"). Tujuannya melindungi kredibilitas dan menghindari penolakan iklan.
- Hindari klaim **"menyembuhkan"**. Gunakan "membantu", "mendukung", "menstimulasi".
- Disclaimer di footer: *"Hydrotherapy merupakan terapi pendukung dan tidak menggantikan diagnosis maupun penanganan dari dokter atau tenaga medis."*
- Iklan Meta membatasi teks yang "menyinggung kondisi pribadi" (mis. "Apakah anak Anda autis?"). Gunakan sudut positif, mis. *"Bantu si kecil lebih tenang & fokus"*. Ini berlaku untuk headline landing page maupun materi iklan.
- Gaya bahasa: hangat, menenangkan, sapaan "Ayah/Bunda", tidak menggurui.

---

## 12. Desain Visual

Perpaduan **tenang-premium (logo)** dan **ceria (poster)**.

| Peran | Warna | Sumber |
|---|---|---|
| Navy (teks utama, kedalaman) | `#0F2028` | logo |
| Teal tua (brand) | `#1D5A6B` | logo |
| Biru keabuan | `#5E8592` / `#486875` | logo |
| Mist (latar lembut) | `#9CB4BA` / `#F5F8F9` | logo |
| Aqua kolam (aksen ceria) | `#2EC4D6` | foto kolam & poster |
| Kuning ceria (CTA sekunder, bintang) | `#FFD447` | poster |
| Hijau WhatsApp (tombol WA) | `#25D366` | standar WA |

- **Tipografi**: judul memakai font membulat dan ramah (mis. *Fredoka* / *Baloo 2*), senada dengan poster. Isi teks memakai *Plus Jakarta Sans* (mudah dibaca dan buatan Indonesia). Font di-*self-host*, hanya subset Latin.
- **Bentuk**: sudut membulat besar, bingkai foto organik seperti "blob" air (seperti di poster), pemisah gelombang antar-bagian.
- **Ilustrasi**: ikon garis sederhana bertema air. Ilustrasi kartun di poster tidak dipakai di web (kemungkinan aset pihak ketiga yang berhak cipta).
- **Foto**: foto kolam Danau Bogor Raya & foto kegiatan. Foto anak dipilih yang wajahnya tidak jelas atau sudah disetujui. **Foto di poster konten-1/konten-2 memperlihatkan wajah anak dan perlu konfirmasi izin (§14).**

---

## 13. Persyaratan Non-Fungsional

**Mobile-first**
- Dirancang mulai dari layar 360 px, lalu ditingkatkan untuk tablet/desktop.
- Target sentuh ≥ 48 px. Teks isi ≥ 16 px. Tombol utama mudah dijangkau ibu jari.
- Diuji di Chrome Android dan Safari iOS, serta *in-app browser* Instagram/Facebook (tempat utama pengunjung iklan membuka website).

**Performa** (Lighthouse Mobile, jaringan 4G)

| Metrik | Beranda | Landing page |
|---|---|---|
| Performance | ≥ 80 | ≥ 90 |
| LCP | < 2,5 dtk | < 2,0 dtk |
| CLS | < 0,1 | < 0,1 |
| JS awal (gzip) | ≤ 180 KB (3D dimuat terpisah) | ≤ 120 KB |
| Animasi 3D | ≥ 50 fps di HP Android menengah | — |

- Gambar dikonversi ke AVIF/WebP dalam beberapa ukuran, dimuat bertahap (*lazy*).
- Peta Google dimuat hanya saat bagian lokasi terlihat.

**Aksesibilitas**
- Kontras warna sesuai WCAG AA.
- Semua gambar memiliki teks alternatif.
- Formulir bisa dipakai dengan pembaca layar.
- Mode Tenang tersedia (§6).

**SEO**
- Meta title/description per halaman, Open Graph (pratinjau cantik saat link dibagikan di WA/IG).
- Data terstruktur `LocalBusiness` / `MedicalBusiness`: alamat, jam, telepon, koordinat.
- `sitemap.xml`, `robots.txt`. Landing page iklan diberi `noindex` agar tidak bersaing dengan beranda.
- Kata kunci: hydrotherapy anak, terapi air ABK, terapi neurosensori anak, terapi anak berkebutuhan khusus Bogor.

**Analitik & iklan**
- Event yang dicatat:
  - `klik_whatsapp` (beserta posisi tombol)
  - `kirim_formulir`
  - `klik_petunjuk_arah`
  - `klik_instagram`
  - `scroll_75`
- Didukung: Google Analytics 4 dan **Meta Pixel** (penting untuk optimasi iklan). ID diisi lewat konfigurasi → **perlu dari pemilik (§14)**.

**Keamanan & privasi**
- HTTPS (otomatis dari Vercel).
- Tidak menyimpan data pribadi di server.
- Halaman kebijakan privasi.

**Kemudahan perubahan (untuk Hermes agent)**
- **Semua teks, harga, jam, nomor WA, testimoni, dan FAQ dikumpulkan di satu file**: `src/content/site.ts`. Perubahan konten cukup di file itu tanpa menyentuh kode tampilan.
- `README.md` berisi panduan singkat "cara mengubah konten" yang bisa dibaca manusia maupun AI agent.

---

## 14. Hal yang Masih Perlu Dari Anda

| # | Item | Dampak bila belum ada |
|---|---|---|
| 1 | **Konfirmasi domain**: tertulis `hydroneurforge.io` (tanpa "o" setelah neur). Apakah yang benar `hydroneuroforge.io`? | Penting sebelum menyambungkan domain |
| 2 | **Akses Vercel**: akun Vercel Anda (saya pandu menghubungkan), atau saya buat preview lalu Anda klaim. Juga apakah ada repo GitHub? | Preview tetap bisa dibuat |
| 3 | File **logo asli** resolusi tinggi / vektor (SVG, AI, PDF) + logo AASM & Yayasan Anak Spesial Indonesia | Saya buat versi vektor dari JPG yang ada |
| 4 | **Izin foto**: bolehkah foto anak di poster konten-1/konten-2 dipakai? | Pakai foto suasana kolam + foto yang wajahnya tidak jelas |
| 5 | Konfirmasi **daftar kondisi** yang ditangani (§7 no. 5) & **jawaban FAQ** | Saya tulis draf, Anda koreksi |
| 6 | Apakah **observasi awal gratis/berbayar**? (memengaruhi CTA "Konsultasi Gratis") | Pakai "Konsultasi via WhatsApp" tanpa kata "gratis" |
| 7 | Alamat lengkap untuk ditampilkan (nama jalan/kode pos) | Pakai "Sportclub Danau Bogor Raya, Bogor" + peta |
| 8 | ID **Meta Pixel** & **Google Analytics 4** (bisa menyusul) | Event disiapkan, aktif setelah ID diisi |
| 9 | Hari operasional: Senin–Minggu atau ada hari libur? | Tampilkan "Setiap hari, 08.00–17.00" |

---

## 15. Teknologi

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | **Vite + React + TypeScript** | Cepat, ringan, mudah diedit agent |
| Routing & pre-render | React Router + pre-render statis tiap halaman | HTML siap tampil = cepat & ramah SEO |
| 3D | **Three.js** via React Three Fiber + drei | Ekosistem 3D web paling matang |
| Animasi scroll | **GSAP ScrollTrigger** + Lenis (smooth scroll) | Sinkronisasi kamera 3D dengan scroll |
| Styling | **Tailwind CSS** | Konsisten, mobile-first |
| Formulir | React Hook Form + Zod | Validasi ringan |
| Gambar | Optimasi otomatis saat build (AVIF/WebP) | Hemat kuota pengunjung |
| Hosting | **Vercel** (preview → domain `.io`) | Gratis, HTTPS, CDN global |

---

## 16. Jadwal Pengerjaan

| Tahap | Isi | Hasil |
|---|---|---|
| 1. Fondasi | Setup proyek, desain dasar, optimasi aset, konten di `site.ts` | Kerangka situs |
| 2. Beranda | Semua bagian HTML + responsif HP | Beranda tanpa 3D sudah utuh |
| 3. Pengalaman 3D | Air, caustics, god rays, logo 3D, perjalanan menyelam, fallback, Mode Tenang | Efek "wow" |
| 4. Landing page | `/hydrotherapy`, formulir WA, UTM, analitik | Siap iklan |
| 5. Poles & uji | Performa, uji di HP & browser Instagram, SEO, aksesibilitas | Skor target tercapai |
| 6. Rilis | Preview Vercel → revisi → sambung domain | Live |

Tahap 1–5 dikerjakan berturut-turut dalam sesi ini. Setelah selesai, Anda menerima **link preview Vercel** untuk dicoba di HP, lalu kita revisi bersama.

---

## 17. Di Luar Lingkup Versi 1

Hal berikut tidak dikerjakan di versi 1:
- Panel admin / CMS
- Blog/artikel
- Bahasa Inggris
- Booking jadwal otomatis
- Pembayaran online
- Video testimoni

Semuanya bisa ditambahkan di versi berikutnya.

---

## 18. Keputusan Setelah Diskusi (v1.1)

| Topik | Keputusan |
|---|---|
| Domain | `hydroneuroforge.io`. Disambungkan oleh pemilik (via Hermes agent) |
| Hosting | Vercel (pemilik sudah punya akun), repo GitHub `hydro-neuroforge` |
| Foto anak | Boleh dipakai, **wajah anak diburamkan** |
| Konsultasi | Via WhatsApp **gratis**. Observasi tatap muka **berbayar**, sudah termasuk sesi konsultasi langsung |
| Logo | Belum ada file vektor. Simbol diambil dari JPG (latar dihapus, ada versi terang untuk latar gelap). Tulisan logo dibuat ulang dengan HTML sehingga ejaannya **CENTER** |
| Logo partner | Diambil dari poster (AASM & Yayasan Anak Spesial Indonesia) |
| Video | Tidak dipakai di v1 |
