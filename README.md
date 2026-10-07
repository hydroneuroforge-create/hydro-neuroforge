# Hydro Neuroforge Center — Website 3D

Website landing page 3D interaktif untuk **Hydro Neuroforge Center**, layanan hidroterapi & fun swimming untuk anak berkebutuhan khusus di Sportclub Danau Bogor Raya.

> _Menempa Potensi, Merawat Harapan._

## ✨ Fitur

- 🌊 **Hero 3D** — scene air beriak + kolam terapi 3D (Three.js) dengan gelembung mengambang
- 💙 Nuansa ceria & menenangkan, dominasi biru awan + putih
- 📱 Responsif (mobile-first), scene 3D di-_lazy-load_ agar cepat di HP
- 💬 Tombol **WhatsApp** mengambang + form kontak yang kirim langsung ke WhatsApp
- 🖼️ Galeri terhubung ke Instagram [@hydro.neuroforge](https://www.instagram.com/hydro.neuroforge)
- ❓ FAQ accordion
- 📍 Embed Google Maps lokasi
- 🌐 Bahasa Indonesia dominan dengan sentuhan Inggris profesional

## 🛠️ Teknologi

React 19 · TypeScript · Vite · Three.js (@react-three/fiber + drei) · Tailwind CSS v4 · Framer Motion · lucide-react

## 🚀 Menjalankan

```bash
npm install        # install dependencies (sekali saja)
npm run dev        # jalankan di mode pengembangan (buka http://localhost:5173)
npm run build      # build untuk produksi (hasil di folder dist/)
npm run preview    # preview hasil build produksi
```

## ⚙️ Konfigurasi (WAJIB diisi sebelum live)

Semua info kontak terpusat di **`src/config.ts`** — cukup edit satu file ini:

| Variabel | Keterangan |
|----------|------------|
| `WHATSAPP_NUMBER` | Nomor WhatsApp resmi, format internasional tanpa `+` (contoh `6281234567890`) |
| `INSTAGRAM_URL` / `INSTAGRAM_HANDLE` | Sudah terisi `@hydro.neuroforge` |
| `MAPS_EMBED_URL` / `MAPS_LINK` | Embed Google Maps — ganti dengan embed resmi lokasi bila sudah ada |
| `LOCATION_FULL` | Alamat lengkap |

## 📝 Yang perlu dilengkapi nanti

- [ ] Nomor WhatsApp asli di `src/config.ts`
- [ ] Foto fasilitas asli untuk galeri (saat ini placeholder ilustratif)
- [ ] Testimoni asli orang tua (`src/components/Testimonials.tsx`)
- [ ] Embed Google Maps final

## 📂 Struktur

```
src/
├── config.ts              # ← pusat konfigurasi (WA, IG, Maps, brand)
├── App.tsx                # susunan semua section
├── three/
│   └── WaterScene.tsx     # scene 3D: air, kolam terapi, gelembung
└── components/
    ├── Navbar.tsx  Hero.tsx  About.tsx  Services.tsx  Benefits.tsx
    ├── Gallery.tsx  Testimonials.tsx  FAQ.tsx  Location.tsx
    ├── Contact.tsx  Footer.tsx  WhatsAppFloat.tsx  Section.tsx
    └── icons/InstagramIcon.tsx
```
