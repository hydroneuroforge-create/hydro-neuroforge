import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { WaIcon, WaLink } from './WaLink'
import { CalmToggle } from './CalmToggle'

const nav = [
  { href: '#manfaat', label: 'Manfaat' },
  { href: '#program', label: 'Program' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#lokasi', label: 'Lokasi' },
]

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setSolid(scrollY > 40)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? 'bg-navy/85 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-navy/60 to-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[72px] md:px-5">
        <a href="/" aria-label="Hydro Neuroforge Center, beranda">
          <span className="md:hidden"><Logo tone="light" size="sm" /></span>
          <span className="hidden md:block"><Logo tone="light" /></span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/85 md:flex" aria-label="Navigasi utama">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WaLink place="header" className="btn-wa hidden min-h-11 px-5 text-sm sm:inline-flex">
            <WaIcon className="size-4" /> Chat WA
          </WaLink>
          <button type="button" onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-full text-white md:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="h-[calc(100svh-64px)] overflow-y-auto border-t border-white/10 bg-navy/95 px-5 pt-6 pb-10 md:hidden">
          <nav className="grid gap-1" aria-label="Navigasi seluler">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-white active:bg-white/10">
                {n.label}
              </a>
            ))}
            <a href="#daftar" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-white active:bg-white/10">
              Daftar
            </a>
          </nav>
          <WaLink place="menu" className="btn-wa mt-6 w-full">
            <WaIcon /> Konsultasi Gratis via WhatsApp
          </WaLink>
          <CalmToggle className="mt-5" />
        </div>
      )}
    </header>
  )
}
