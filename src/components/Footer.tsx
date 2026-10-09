import { site } from '../content/site'
import { CalmToggle } from './CalmToggle'
import { Logo } from './Logo'
import { IgIcon, WaIcon, WaLink } from './WaLink'

export function Footer({ showCalm = true }: { showCalm?: boolean }) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-navy pb-28 text-white md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {site.description}
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-bold">Kontak</p>
          <ul className="grid gap-2 text-white/70">
            <li>
              <WaLink place="footer" className="inline-flex items-center gap-2 hover:text-white">
                <WaIcon className="size-4" /> {site.contact.whatsappDisplay}
              </WaLink>
            </li>
            <li>
              <a href={site.contact.instagramUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white">
                <IgIcon className="size-4" /> @{site.contact.instagram}
              </a>
            </li>
            <li>{site.hours.days}, {site.hours.time}</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-bold">Naungan & Partner</p>
          <ul className="grid gap-2 text-white/70">
            <li>Association Aquatic of Sport Medicine</li>
            <li>Yayasan Anak Spesial Indonesia</li>
          </ul>
          {showCalm && <CalmToggle className="mt-5" />}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-5">
        <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/60">{site.disclaimer}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  )
}
