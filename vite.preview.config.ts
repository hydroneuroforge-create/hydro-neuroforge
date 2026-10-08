import react from '@vitejs/plugin-react'
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const OUT = resolve(import.meta.dirname, 'out/final')

/** Sajikan hasil render (out/final/*.mp4) di /renders agar bisa diunduh dari HP. */
const renders = (): Plugin => ({
  name: 'serve-renders',
  configureServer(server) {
    server.middlewares.use('/renders', (req, res) => {
      const name = decodeURIComponent((req.url || '/').split('?')[0].slice(1))
      if (name === 'index.json') {
        const list = existsSync(OUT) ? readdirSync(OUT).filter((f) => /\.(mp4|png)$/.test(f)).sort().map((f) => ({ name: f, size: statSync(join(OUT, f)).size })) : []
        res.setHeader('content-type', 'application/json')
        return res.end(JSON.stringify(list))
      }
      const file = join(OUT, name)
      if (!name || name.includes('..') || !existsSync(file)) {
        res.statusCode = 404
        return res.end()
      }
      res.setHeader('content-type', name.endsWith('.mp4') ? 'video/mp4' : 'image/png')
      res.setHeader('content-disposition', `attachment; filename="${name}"`)
      res.setHeader('content-length', String(statSync(file).size))
      createReadStream(file).pipe(res)
    })
  },
})

// Preview live (Remotion Player) untuk dibuka dari HP lewat tunnel.
export default defineConfig({
  root: resolve(import.meta.dirname, 'preview'),
  publicDir: resolve(import.meta.dirname, 'public'),
  plugins: [react(), renders()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: true,
    // lewat tunnel HTTPS, hot reload memakai port 443
    hmr: process.env.TUNNEL ? { clientPort: 443, protocol: 'wss' } : undefined,
  },
})
