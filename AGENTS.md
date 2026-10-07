# AGENTS.md — Aturan kerja AI agent untuk website Hydro Neuroforge Center

File ini dibaca otomatis oleh AI agent (Hermes Agent, dll.) setiap kali bekerja di repo ini.
Pemilik website adalah satu-satunya pemberi perintah.

## 1. Prinsip utama

1. **Hanya bertindak atas perintah pemilik.** Jangan membuat perubahan, "perbaikan", refactor, atau upgrade library yang tidak diminta.
2. **Desain sudah final dan dikunci.** Jangan mengubah hal berikut kecuali pemilik memintanya secara eksplisit:
   - warna, font, tata letak
   - animasi dan scene 3D (`src/three/`)
   - struktur halaman
3. **Jika perintah ambigu, tanya dulu** sebelum mengubah apa pun. Jelaskan singkat rencana perubahan dan file yang akan disentuh.
4. **Jangan deploy ke produksi tanpa kata "DEPLOY" / "terbitkan" dari pemilik.**
5. **Sumber kebenaran adalah repo GitHub ini** (`main`). Jangan pernah mengedit file langsung di server.

## 2. Di mana mengubah apa

| Perubahan | File |
|---|---|
| Teks, harga, jam, nomor WA, Instagram, testimoni, FAQ, pilihan formulir, ID analitik | `src/content/site.ts` (utamakan file ini) |
| Judul/teks bagian beranda | `src/pages/HomePage.tsx` |
| Judul/teks landing page iklan | `src/pages/LandingPage.tsx` |
| Meta title/description/SEO | `index.html`, `hydrotherapy/index.html` |
| Foto | taruh di `assets-src/`, lalu `npm run images` |
| Gerakan kamera 3D per bagian | atribut `data-depth`, `data-pitch`, `data-brain`, `data-assemble` di `HomePage.tsx` |

Jangan mengubah `scripts/`, `vite.config.ts`, `vercel.json`, atau `package.json` kecuali diminta.

## 3. Aturan konten (WAJIB)

- **Privasi anak:**
  - Jangan menulis nama asli anak/terapis di repo (repo publik). Gunakan `[[sensor]]` di testimoni.
  - Semua foto anak harus sudah diburamkan wajahnya sebelum masuk `assets-src/`.
- **Testimoni harus asli.** Salin apa adanya dari screenshot; jangan mengarang atau "merapikan" kalimat.
- **Klaim Harvard** ditulis "Berlandaskan riset Center on the Developing Child, Harvard University":
  - Jangan menulis "bekerja sama dengan", "disertifikasi", atau "diakui" Harvard.
  - Jangan memakai logo Harvard.
- Jangan memakai kata **"menyembuhkan"**. Gunakan "membantu", "mendukung", "menstimulasi".
- Nama brand di web: **Hydro Neuroforge Center** (ejaan *Center*).
- Bahasa: Indonesia, hangat, sapaan "Ayah/Bunda".
- Konsultasi WhatsApp **gratis**; observasi tatap muka **berbayar** (sudah termasuk konsultasi langsung).

## 4. Alur kerja setiap perubahan

1. Ulangi singkat permintaan pemilik + rencana perubahan → tunggu "ok" bila perubahan menyentuh desain.
2. Buat branch baru dari `main` (mis. `ubah/harga-november`).
3. Lakukan perubahan seminimal mungkin.
4. Jalankan `npm ci` (bila perlu) lalu `npm run build`. **Build harus sukses.**
5. Push branch → buat Pull Request → kirim ke pemilik:
   - ringkasan perubahan
   - link preview (Vercel membuat preview otomatis per PR)
6. Tunggu persetujuan pemilik ("DEPLOY").
7. Merge ke `main` → deploy (lihat §5) → cek website live (§6) → laporkan hasil.

Bila ada yang rusak setelah deploy: kembalikan ke versi sebelumnya (revert commit / redeploy deployment sebelumnya) lalu laporkan.

## 5. Deploy

Website ini **statis**. Hasil build ada di folder `dist/`.

**Opsi A — Vercel (direkomendasikan):** repo tersambung ke Vercel. Setiap merge ke `main` otomatis terbit ke `hydroneuroforge.io`. Tidak perlu langkah manual.

**Opsi B — server/VPS sendiri (Nginx):**

```bash
git pull origin main && npm ci && npm run build
rsync -av --delete dist/ /var/www/hydroneuroforge/   # sesuaikan path
```

Konfigurasi Nginx minimal:

```nginx
server {
  server_name hydroneuroforge.io www.hydroneuroforge.io;
  root /var/www/hydroneuroforge;
  location / { try_files $uri $uri.html $uri/ =404; }
  error_page 404 /404.html;
  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location /img/    { add_header Cache-Control "public, max-age=2592000"; }
  gzip on; gzip_types text/css application/javascript image/svg+xml;
}
```

HTTPS memakai certbot: `certbot --nginx -d hydroneuroforge.io -d www.hydroneuroforge.io`.

Jangan menyimpan password/token server di repo.

## 6. Cek setelah deploy

- `/`, `/hydrotherapy`, `/kebijakan-privasi` tampil (status 200). Alamat ngawur menampilkan halaman 404.
- Tombol WhatsApp membuka `wa.me/62881080219722`.
- Formulir membuka WhatsApp dengan pesan terisi.
- Tampilan HP (lebar 390px) rapi, tidak ada error di console.
