// Mengubah gambar di assets-src/ menjadi AVIF + WebP berbagai ukuran di public/img/
// dan menulis daftar ukuran ke src/content/images.generated.ts.
// Jalankan: npm run images  (hanya perlu bila ada gambar baru/diganti)
import sharp from 'sharp'
import { mkdir, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'assets-src'
const OUT = 'public/img'

/** name → lebar output yang diinginkan */
const presets = {
  photo: [480, 800, 1200],
  poster: [600, 1000, 1400],
  logo: [128, 256],
  partner: [200, 400],
}
const kindOf = (name) =>
  name.startsWith('testimoni') ? 'poster'
  : name.startsWith('logo-mark') ? 'logo'
  : name.startsWith('logo-') ? 'partner'
  : 'photo'

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== 'logo-full.png')
const manifest = {}

for (const file of files) {
  const name = path.parse(file).name
  const input = sharp(path.join(SRC, file)).rotate()
  const meta = await input.metadata()
  const widths = presets[kindOf(name)].filter((w) => w <= meta.width)
  if (!widths.length || widths.at(-1) < meta.width) widths.push(Math.min(meta.width, presets[kindOf(name)].at(-1)))
  const uniq = [...new Set(widths)].sort((a, b) => a - b)
  for (const w of uniq) {
    const img = sharp(path.join(SRC, file)).rotate().resize({ width: w })
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${name}-${w}.avif`)
    await img.clone().webp({ quality: 74, effort: 6 }).toFile(`${OUT}/${name}-${w}.webp`)
  }
  manifest[name] = { w: meta.width, h: meta.height, widths: uniq }
  console.log(name, uniq.join(','))
}

// favicon & ikon aplikasi dari logo-mark
const mark = path.join(SRC, 'logo-mark.png')
const square = async (size, out, bg) => {
  const pad = Math.round(size * 0.08)
  const inner = await sharp(mark).resize({ width: size - pad * 2, height: size - pad * 2, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: 'center' }]).png().toFile(out)
}
await square(32, 'public/favicon-32.png', { r: 0, g: 0, b: 0, alpha: 0 })
await square(180, 'public/apple-touch-icon.png', { r: 255, g: 255, b: 255, alpha: 1 })
await square(512, 'public/icon-512.png', { r: 255, g: 255, b: 255, alpha: 1 })

await writeFile(
  'src/content/images.generated.ts',
  `// File ini dibuat otomatis oleh scripts/optimize-images.mjs — jangan diedit manual.\nexport const images = ${JSON.stringify(manifest, null, 2)} as const\nexport type ImageName = keyof typeof images\n`,
)
