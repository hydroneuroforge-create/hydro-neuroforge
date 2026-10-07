import { Droplets, MessageCircle, MapPin } from 'lucide-react'
import InstagramIcon from './icons/InstagramIcon'
import {
  BRAND,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  buildWhatsAppLink,
  MAPS_LINK,
  LOCATION_NAME,
} from '../config'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0f3b57] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-brand to-sky-ocean">
              <Droplets className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">{BRAND.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky-100/70">
            Layanan hidroterapi &amp; fun swimming untuk anak berkebutuhan
            khusus. {BRAND.tagline}.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-bold">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/70">
            {[
              ['Tentang', '#tentang'],
              ['Layanan', '#layanan'],
              ['Manfaat', '#manfaat'],
              ['Galeri', '#galeri'],
              ['FAQ', '#faq'],
              ['Lokasi', '#lokasi'],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-sky-brand">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold">Hubungi Kami</h4>
          <ul className="mt-4 space-y-3 text-sm text-sky-100/70">
            <li>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-sky-brand"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-sky-brand"
              >
                <InstagramIcon className="h-4 w-4" /> @{INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-sky-brand"
              >
                <MapPin className="h-4 w-4" /> {LOCATION_NAME}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-sky-100/50">
        © {year} {BRAND.name}. Didirikan oleh {BRAND.founder}. Dibuat dengan 💙.
      </div>
    </footer>
  )
}
