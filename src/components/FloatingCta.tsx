import { useEffect, useState } from 'react'
import { WaIcon, WaLink } from './WaLink'

/**
 * - Di HP: bar CTA lengket di bawah layar setelah melewati hero.
 * - Di desktop: tombol WA bulat melayang di pojok kanan bawah.
 * Disembunyikan ketika formulir sedang terlihat agar tidak menutupi.
 */
export function FloatingCta({ label = 'Konsultasi Gratis via WhatsApp', tone = 'dark' }: { label?: string; tone?: 'dark' | 'light' }) {
  const [show, setShow] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    const form = document.getElementById('daftar')
    let io: IntersectionObserver | undefined
    if (form) {
      io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
      io.observe(form)
    }
    return () => {
      removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  const visible = show && !formVisible
  return (
    <>
      {/* HP */}
      <div
        className={`pb-safe fixed inset-x-0 bottom-0 z-40 px-4 pt-3 transition-transform duration-500 md:hidden ${visible ? 'translate-y-0' : 'translate-y-[120%]'}`}
        style={{ background: tone === 'dark' ? 'linear-gradient(180deg, transparent, rgb(15 32 40 / 0.85) 40%)' : 'linear-gradient(180deg, transparent, rgb(245 248 249 / 0.95) 40%)' }}
      >
        <WaLink place="bar-bawah" className="btn-wa w-full text-[15px]" tabIndex={visible ? 0 : -1}>
          <WaIcon /> {label}
        </WaLink>
      </div>
      {/* Desktop */}
      <WaLink
        place="melayang"
        aria-label="Chat WhatsApp"
        className={`fixed right-6 bottom-6 z-40 hidden size-16 items-center justify-center rounded-full bg-wa text-white shadow-[0_12px_30px_-6px_rgb(37_211_102/0.7)] transition-all duration-500 hover:scale-105 md:flex ${visible ? 'opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-wa" aria-hidden="true" />
        <WaIcon className="relative size-8" />
      </WaLink>
    </>
  )
}
