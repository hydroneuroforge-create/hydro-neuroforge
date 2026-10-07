import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Multi-page: setiap halaman punya HTML sendiri yang di-prerender saat build
// (lihat scripts/prerender.mjs) agar cepat tampil & ramah SEO.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild
      ? {}
      : {
          input: {
            home: resolve(import.meta.dirname, 'index.html'),
            hydrotherapy: resolve(import.meta.dirname, 'hydrotherapy/index.html'),
            privasi: resolve(import.meta.dirname, 'kebijakan-privasi/index.html'),
            notfound: resolve(import.meta.dirname, '404.html'),
          },
        },
  },
}))
