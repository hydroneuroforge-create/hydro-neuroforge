// Mengisi HTML hasil build dengan isi halaman (render React di server saat build).
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const ssrEntry = pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
const { render, files } = await import(ssrEntry)

for (const file of files) {
  const target = path.join('dist', file)
  const html = await readFile(target, 'utf8')
  if (!html.includes('<!--app-html-->')) throw new Error(`Placeholder tidak ditemukan di ${file}`)
  const out = html.replace('<!--app-html-->', render(file))
  await writeFile(target, out)
  console.log(`✓ prerender ${file} (${(out.length / 1024).toFixed(1)} KB)`)
}
await rm('dist-ssr', { recursive: true, force: true })
