import { useEffect, useState } from 'react'
import { Menu, X, Droplets } from 'lucide-react'
import { buildWhatsAppLink, BRAND } from '../config'

const LINKS = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Manfaat', href: '#manfaat' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Lokasi', href: '#lokasi' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 shadow-sm shadow-sky-200/50 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-brand to-sky-ocean text-white shadow-md">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold leading-tight text-[#0f3b57]">
            {BRAND.shortName}
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-sky-ocean">
              Center
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-[#3b6b8a] transition-colors hover:text-sky-ocean"
            >
              {l.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-sky-brand to-sky-ocean px-5 py-2 text-sm font-bold text-white shadow-md shadow-sky-300/50 transition-transform hover:scale-105"
          >
            Daftar Sekarang
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-sky-ocean lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-sky-100 bg-white/95 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-semibold text-[#3b6b8a] hover:bg-sky-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-gradient-to-r from-sky-brand to-sky-ocean px-5 py-2.5 text-center font-bold text-white"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
