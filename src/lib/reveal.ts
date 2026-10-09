import { useEffect } from 'react'

/**
 * Animasi masuk untuk semua elemen [data-reveal] (GSAP + ScrollTrigger).
 * data-reveal="up" (default) | "left" | "right" | "zoom"
 * data-delay="0.1"  → jeda dalam detik
 */
export function useReveal() {
  useEffect(() => {
    let cleanup = () => {}
    let cancelled = false
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const calm = document.documentElement.classList.contains('calm')
    if (calm) {
      els.forEach((el) => Object.assign(el.style, { opacity: '1', transform: 'none' }))
      return
    }
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        els.forEach((el) => {
          const kind = el.dataset.reveal || 'up'
          const from: gsap.TweenVars =
            kind === 'left' ? { x: -40, y: 0 } : kind === 'right' ? { x: 40, y: 0 } : kind === 'zoom' ? { scale: 0.92, y: 10 } : { y: 28 }
          gsap.fromTo(
            el,
            { opacity: 0, ...from },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              delay: Number(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })
      })
      cleanup = () => ctx.revert()
    })
    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
