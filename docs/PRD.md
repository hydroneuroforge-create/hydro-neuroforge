# PRD: Video Motion Graphic "Hydrotherapy for Special Needs"

| | |
|---|---|
| **Versi** | 1.0 (draf untuk disetujui) |
| **Tanggal** | 8 Oktober 2026 |
| **Sumber** | Poster "Hydrotherapy for Special Needs" (`konten-2`) |
| **Alat** | Remotion (React) + ffmpeg. Sudah diuji: render 1080×1920 berhasil di lingkungan kerja |
| **Status** | Menunggu persetujuan pemilik |

---

## 1. Tujuan

Mengubah poster statis menjadi video motion graphic pendek yang:
1. **Menghentikan scroll** dalam 2 detik pertama di Reels, TikTok, Story, dan status WhatsApp.
2. Menyampaikan isi poster: judul, 4 manfaat, lokasi, dan nomor WhatsApp.
3. Mengarahkan penonton untuk **chat WhatsApp** atau membuka **hydroneuroforge.io**.
4. Bisa dipakai sebagai **materi iklan** untuk landing page `/hydrotherapy`.

---

## 2. Spesifikasi Output

| Item | Utama | Opsional (tahap 2) |
|---|---|---|
| Rasio | **9:16** (1080×1920), untuk Reels, TikTok, Story, status WA | 4:5 (1080×1350) untuk feed, 1:1 |
| Durasi | **± 30 detik** | Versi pendek 15 detik untuk iklan |
| Frame rate | 30 fps | |
| Format | MP4 (H.264), ukuran di bawah 50 MB | |
| Audio | Versi **tanpa musik** (musik ditambahkan dari library Instagram/TikTok agar aman hak cipta) | Versi dengan efek suara gelembung/air (lihat §8) |
| Cover | Gambar sampul 1080×1920 (PNG) | |
| Loop | Akhir video menyambung mulus ke awal, sehingga Reels terasa berulang tanpa putus | |

**Safe zone Reels/TikTok:** teks penting tidak diletakkan di 220 px teratas, 420 px terbawah, dan 140 px sisi kanan, supaya tidak tertutup caption dan tombol aplikasi.

---

## 3. Gaya Visual

Mengikuti poster: ceria, biru muda, kuning, bentuk organik seperti tetesan air.

| Elemen | Dari poster | Di video |
|---|---|---|
| Latar | Biru muda + garis gelombang | Permukaan air bergerak dengan pantulan cahaya (caustics), sama seperti di website |
| Judul | "HYDROTHERAPY" putih bertepi biru, "SPECIAL NEEDS" kuning | Font bulat tebal yang mirip, huruf memantul dan mengapung seperti di air |
| Foto | Bingkai berbentuk tetesan/blob | Bingkai blob yang bentuknya bergoyang pelan + zoom halus |
| Daftar manfaat | Panah kuning + teks kapital | Panah "meluncur" lalu teks muncul satu per satu |
| Ilustrasi | Anak berenang, kacamata snorkel, ombak | **Digambar ulang** sebagai vektor sederhana bergaya sama (tidak menyalin elemen poster) |
| Motif latar | Ikon otak samar | Jaringan saraf bercahaya yang terbentuk perlahan (motif "Neuroforge") |

Warna brand: navy `#0F2028`, teal `#1D5A6B`, aqua `#2EC4D6`, biru muda `#A9ECF3`, kuning `#FFD447`, hijau WhatsApp `#25D366`.

---

## 4. Storyboard (30 detik)

| # | Waktu | Adegan | Teks di layar | Animasi |
|---|---|---|---|---|
| 1 | 0,0–2,5 dtk | **Hook: dari dalam air ke permukaan** | (logo) | Gelembung naik cepat, kamera "muncul" ke permukaan, riak melebar, simbol logo terbentuk dari air, tulisan logo muncul |
| 2 | 2,5–6,5 dtk | **Judul** | HYDROTHERAPY / FOR / SPECIAL NEEDS | Huruf jatuh ke air satu per satu lalu memantul, "SPECIAL NEEDS" kuning bergoyang, ilustrasi anak berenang melintas, snorkel mengapung |
| 3 | 6,5–9,5 dtk | **Suasana** | Sportclub Danau Bogor Raya | 2 foto dalam bingkai blob mengembang masuk, zoom pelan |
| 4 | 9,5–21,5 dtk | **4 Manfaat** (±3 dtk per poin) | MANFAAT HYDROTHERAPY, lalu: Integrasi sistem saraf pusat otak · Meningkatkan fokus, regulasi emosi & kepercayaan diri · Stimulasi sistem sensorik · Koordinasi motorik | Pita judul meluncur, tiap poin: panah kuning melesat, ikon kecil (otak, hati, kilau, gerak), foto berganti di bingkai blob |
| 5 | 21,5–26,5 dtk | **Ajakan** | Konsultasi gratis via WhatsApp · 0881-0802-19722 · Sportclub Danau Bogor Raya | Ombak menyapu dari bawah, ikon lokasi dan WhatsApp memantul masuk, tombol hijau berdenyut |
| 6 | 26,5–30,0 dtk | **Penutup** | Logo · "Magic of water, power of Neuroforge." · hydroneuroforge.io · @hydro.neuroforge | Slogan berkilau, lalu turun kembali ke air (menyambung ke adegan 1 untuk loop) |

Aturan teks:
- Ukuran minimum ±44 px pada lebar 1080 px agar terbaca di HP.
- Setiap teks tampil minimal 1,5 detik.
- Tanpa tanda pisah panjang (—). Tulis "1 on 1" bila muncul.
- Isi teks diambil dari poster dan website. Tidak ada klaim baru.

---

## 5. Aset

| Aset | Status | Catatan |
|---|---|---|
| Logo (simbol) | ✅ Ada | Versi transparan & versi terang dari website |
| Foto kegiatan | ⚠️ Ada, resolusi rendah | Foto di poster hanya ±300–500 px. Di video 1080×1920 akan tampak kurang tajam. **Mohon kirim foto asli** dari 4 adegan di poster. Bila tidak ada, foto ditampilkan lebih kecil dan diberi gerakan agar tidak terlihat pecah |
| Foto tambahan | ✅ Ada | 2 foto kegiatan yang Anda kirim + foto suasana kolam |
| Ilustrasi | 🛠️ Dibuat | Vektor baru: anak berenang, snorkel, gelembung, ombak, ikon manfaat |
| Font | 🛠️ Dipilih | Font bulat tebal gratis untuk judul + Plus Jakarta Sans (font website) untuk teks |

**Privasi:** wajah semua anak diburamkan, sama seperti di website. Wajah terapis tidak diburamkan.

---

## 6. Teknologi & Cara Edit di Masa Depan

- **Remotion**: video dibuat dari kode React, sehingga teks, warna, durasi, dan foto bisa diganti tanpa mendesain ulang.
- Semua teks, nomor WA, dan urutan foto dikumpulkan di satu file `src/content.ts`. Hermes Agent bisa mengubahnya lalu me-render ulang.
- Efek air memakai shader yang sama dengan website, supaya video dan website terasa satu identitas.
- **Lisensi Remotion:** gratis untuk individu dan perusahaan dengan **maksimal 3 orang**. Lebih dari itu wajib membeli Company License ([FAQ lisensi Remotion](https://www.remotion.dev/docs/license/faq)). → **perlu konfirmasi jumlah tim (§9)**.

---

## 7. Alur Kerja

| Tahap | Hasil | Persetujuan |
|---|---|---|
| 1. PRD | Dokumen ini | Anda setujui / revisi |
| 2. Storyboard visual | 6 gambar diam (1 per adegan) untuk cek tampilan sebelum dianimasikan | Anda setujui / revisi |
| 3. Draf animasi | Video lengkap 30 detik | Revisi |
| 4. Final | MP4 final + cover + (opsional) versi 15 detik & 4:5 | Selesai |

Tahap 2 penting agar revisi gaya dilakukan di gambar diam yang cepat diubah, bukan di video yang lama di-render.

---

## 8. Audio

- **Default: tanpa musik.** Musik paling aman ditambahkan langsung dari library Instagram/TikTok saat posting, karena hak ciptanya sudah ditangani platform.
- **Opsional:** efek suara ringan (gelembung, cipratan, "whoosh") dari sumber bebas lisensi komersial, disinkronkan dengan animasi.
- Tidak ada narasi suara di versi 1.

---

## 9. Yang Perlu Dikonfirmasi

| # | Pertanyaan | Bila belum dijawab |
|---|---|---|
| 1 | Tulisan logo di video: **CENTER** (seperti website) atau **CENTRE** (seperti poster & Instagram)? | CENTER |
| 2 | Jumlah orang di tim/usaha Anda 3 orang atau kurang? (lisensi Remotion gratis) | Dianggap ≤ 3 |
| 3 | Ada **foto asli** resolusi penuh dari adegan di poster? | Pakai foto yang ada |
| 4 | Mau versi dengan **efek suara**, atau tanpa audio saja? | Tanpa audio + versi efek suara |
| 5 | Perlu versi tambahan **15 detik** (iklan) dan **4:5** (feed)? | Ya, di tahap 4 |
| 6 | Tambahkan teks "Berlandaskan riset Center on the Developing Child, Harvard University" di video? (tidak ada di poster) | Tidak |
| 7 | Hasil video dikirim lewat file explorer saja, atau juga dibuatkan repo GitHub baru `hydro-neuroforge-motion` agar mudah diunduh di HP? | Keduanya |

---

## 10. Di Luar Lingkup Versi 1

Narasi suara, musik buatan sendiri, subtitle, posting ke media sosial, dan video dari rekaman kegiatan (bisa jadi proyek berikutnya setelah wajah anak diburamkan).
