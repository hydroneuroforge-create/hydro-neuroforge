# Hydro Neuroforge Center — Website

Website 3D untuk **Hydro Neuroforge Center** (Hydrotherapy for Special Needs, Sportclub Danau Bogor Raya).
Rencana produk lengkap ada di [`docs/PRD.md`](docs/PRD.md).

| Halaman | URL | Fungsi |
|---|---|---|
| Beranda | `/` | Branding. Pengalaman 3D "menyelam" mengikuti scroll |
| Landing page iklan | `/hydrotherapy` | Tujuan iklan IG/FB/Google. Ringan, tanpa menu, fokus chat WhatsApp |
| Kebijakan privasi | `/kebijakan-privasi` | Wajib karena formulir memuat data diagnosa anak |
| 404 | (otomatis) | Halaman tidak ditemukan |

---

## ✏️ Cara mengubah konten (untuk manusia & AI agent)

**Hampir semua perubahan cukup di satu file: [`src/content/site.ts`](src/content/site.ts).**

| Mau mengubah… | Ubah di `site.ts` bagian |
|---|---|
| Nomor WhatsApp, Instagram | `contact` |
| Jam operasional | `hours` |
| Harga & isi paket | `program` |
| 4 manfaat | `benefits` |
| Alur 3 langkah | `steps` |
| Daftar kondisi anak | `conditions` |
| Testimoni chat | `testimonials.chats` |
| FAQ | `faq` |
| Pilihan diagnosa di formulir | `form.diagnoses` |
| Pesan otomatis tombol WA | `waDefaultMessage` |
| Google Analytics / Meta Pixel | `analytics.ga4Id`, `analytics.metaPixelId` |

Aturan penting:
- **Jangan menulis nama asli anak atau terapis** di repo ini. Untuk bagian yang harus diburamkan di testimoni, tulis `[[sensor]]`.
- Teks testimoni disalin **apa adanya** dari screenshot asli. Jangan mengarang testimoni.
- Klaim Harvard ditulis "Berlandaskan riset Center on the Developing Child, Harvard University". Jangan diubah menjadi "bekerja sama/disertifikasi".

Teks halaman lain (judul bagian, hero) ada di `src/pages/HomePage.tsx` dan `src/pages/LandingPage.tsx`.

### Mengganti / menambah foto
1. Taruh foto (JPG/PNG) di `assets-src/`. **Wajah anak harus sudah diburamkan.**
2. Jalankan `npm run images`. Hasilnya: versi AVIF/WebP di `public/img/` dan daftar ukuran di `src/content/images.generated.ts`.
3. Pakai nama filenya (tanpa ekstensi) di `site.ts`, misalnya di bagian `gallery`.

### Mengatur gerakan kamera 3D di beranda
Setiap `<section>` di `HomePage.tsx` punya atribut berikut:
- `data-depth`: ketinggian kamera (positif = di atas air, negatif = di bawah air)
- `data-pitch`: sudut pandang dalam derajat (negatif = menunduk, positif = menengadah)
- `data-brain`: kemunculan otak neuron (0–1)
- `data-assemble`: seberapa utuh bentuk otaknya (0 = tersebar, 1 = utuh)

---

## 🚀 Menjalankan

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # hasil di dist/ (sudah di-prerender per halaman)
npm run preview   # mencoba hasil build
npm run lint
```

Untuk pengujian, tambahkan parameter `?tier=high`, `?tier=mid`, atau `?tier=low` agar level grafis 3D bisa dipaksa.

## ☁️ Deploy ke Vercel

1. Buka vercel.com → **Add New… → Project** → impor repo `hydro-neuroforge`.
2. Pengaturan terbaca otomatis dari `vercel.json` (build `npm run build`, output `dist`). Klik **Deploy**.
3. Domain: **Settings → Domains** → tambahkan `hydroneuroforge.io`, lalu ikuti instruksi DNS dari Vercel.

## 📣 Link untuk iklan

Gunakan landing page dengan parameter UTM, misalnya:

```
https://hydroneuroforge.io/hydrotherapy?utm_source=instagram&utm_campaign=oktober
```

Sumber iklan ikut tercatat di akhir pesan WhatsApp sebagai `(ref: instagram-oktober)`, sehingga Anda tahu iklan mana yang menghasilkan chat.

## 🧱 Teknologi

Vite + React 19 + TypeScript · Three.js via React Three Fiber (shader air, caustics, god rays, otak neuron prosedural) · GSAP ScrollTrigger · Tailwind CSS v4 · prerender statis (`scripts/prerender.mjs`).

Fitur performa:
- Scene 3D dimuat setelah halaman tampil.
- Kualitas grafis menyesuaikan perangkat dan resolusi turun otomatis bila FPS drop.
- Latar statis untuk perangkat lemah.
- **Mode Tenang** (animasi mati), aktif otomatis bila HP disetel "kurangi gerakan".
- Landing page memakai shader WebGL murni sekitar 2 KB, tanpa Three.js.
