import '../styles/index.css'
import { StrictMode, type ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { initAnalytics, trackScrollDepth } from '../lib/analytics'
import { captureRef } from '../lib/wa'

/** Menyalakan halaman di browser (hydrate HTML hasil prerender). */
export function boot(Page: ComponentType) {
  captureRef()
  const el = document.getElementById('root')!
  const app = (
    <StrictMode>
      <Page />
    </StrictMode>
  )
  if (el.firstElementChild) hydrateRoot(el, app)
  else createRoot(el).render(app)
  window.__hncReady = true
  initAnalytics()
  trackScrollDepth()
}
