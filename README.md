# Hydro Neuroforge Center: Motion Graphic

Video motion graphic "Hydrotherapy for Special Needs". Dibuat dengan [Remotion](https://www.remotion.dev) (React).
Rencana lengkap ada di [`docs/PRD.md`](docs/PRD.md).

| Versi | Ukuran | Durasi | Untuk |
|---|---|---|---|
| `reel30` | 1080×1920 (9:16) | 30 dtk | Reels, TikTok, Story, status WA |
| `reel15` | 1080×1920 (9:16) | 15 dtk | Iklan |
| `feed30` | 1080×1350 (4:5) | 30 dtk | Feed Instagram/Facebook |

Setiap versi tersedia dalam 3 pilihan suara: **musik** (musik orisinal + efek suara), **efek-suara** (tambahkan musik dari Instagram/TikTok), dan **tanpa-suara**.
File final ada di tab **Releases** repo ini.

## ✏️ Mengubah isi

- **Teks, nomor WA, foto:** `src/content.ts`
- **Warna:** `src/theme.ts`
- **Waktu tiap adegan (dan sinkron efek suara):** `src/timeline.js`
- **Foto baru:** taruh di `public/img/`. Wajah anak **wajib** sudah diburamkan.

Aturan teks: tanpa tanda pisah panjang (—), tulis "1 on 1", nama brand "Hydro Neuroforge **Center**".

## 🚀 Perintah

```bash
npm install
npx remotion studio                 # editor visual di browser
bash scripts/audio.sh               # buat ulang musik & efek suara (butuh ffmpeg)
npx remotion render src/index.ts reel30 out/master/reel30.mp4 --props='{"variant":"reel30","audio":"none"}' --muted --gl=swangle
bash scripts/finalize.sh            # gabungkan audio → out/final/*.mp4 + cover
npx vite --config vite.preview.config.ts   # halaman preview untuk HP (Remotion Player)
```

Gunakan `--gl=swangle` di server tanpa GPU. Tanpa opsi itu, efek air tidak tergambar.

## Audio

Musik dan efek suara **disintesis dari nol** oleh `scripts/audio.mjs`, sehingga bebas hak cipta. Kerasnya disamakan ke -14 LUFS (standar media sosial).

## Lisensi Remotion

Gratis untuk usaha dengan maksimal 3 orang ([FAQ lisensi](https://www.remotion.dev/docs/license/faq)). Bila tim bertambah menjadi 4 orang atau lebih, wajib membeli Company License.
