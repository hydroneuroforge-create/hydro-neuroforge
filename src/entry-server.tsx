import { renderToString } from 'react-dom/server'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Dipakai scripts/prerender.mjs untuk menghasilkan HTML statis tiap halaman. */
const pages = {
  'index.html': HomePage,
  'hydrotherapy/index.html': LandingPage,
  'kebijakan-privasi/index.html': PrivacyPage,
  '404.html': NotFoundPage,
} as const

export function render(file: keyof typeof pages) {
  const Page = pages[file]
  return renderToString(<Page />)
}

export const files = Object.keys(pages) as (keyof typeof pages)[]
