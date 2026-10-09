import { useEffect, useRef, useState } from 'react'
import { Clock, MapPin, Navigation } from 'lucide-react'
import { site } from '../content/site'
import { track } from '../lib/analytics'
import { IgIcon, WaIcon, WaLink } from './WaLink'

/** Lokasi + jam + peta (peta baru dimuat ketika mendekati layar). */
export function Location({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loadMap, setLoadMap] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoadMap(true), io.disconnect()), { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const card = tone === 'dark' ? 'glass' : 'bg-white shadow-[0_20px_60px_-25px_rgb(15_32_40/0.3)]'
  const sub = tone === 'dark' ? 'text-white/75' : 'text-slate'
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-[1fr_1.3fr]">
      <div className={`rounded-[28px] p-6 sm:p-8 ${card}`} data-reveal="left">
        <ul className="grid gap-5">
          <li className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-aqua/15 text-aqua"><MapPin aria-hidden="true" /></span>
            <span>
              <span className="block font-bold">{site.location.name}</span>
              <span className={`text-sm ${sub}`}>{site.location.city}</span>
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sun/15 text-sun"><Clock aria-hidden="true" /></span>
            <span>
              <span className="block font-bold">{site.hours.days}</span>
              <span className={`text-sm ${sub}`}>{site.hours.time}</span>
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-wa/15 text-wa"><WaIcon className="size-6" /></span>
            <span>
              <span className="block font-bold">WhatsApp</span>
              <WaLink place="lokasi-nomor" className={`text-sm underline-offset-2 hover:underline ${sub}`}>{site.contact.whatsappDisplay}</WaLink>
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-pink-400/15 text-pink-400"><IgIcon className="size-6" /></span>
            <span>
              <span className="block font-bold">Instagram</span>
              <a href={site.contact.instagramUrl} target="_blank" rel="noopener" onClick={() => track('klik_instagram', { place: 'lokasi' })} className={`text-sm underline-offset-2 hover:underline ${sub}`}>
                @{site.contact.instagram}
              </a>
            </span>
          </li>
        </ul>
        <a
          href={site.location.mapsUrl}
          target="_blank"
          rel="noopener"
          onClick={() => track('klik_petunjuk_arah', { page: location.pathname })}
          className={`btn mt-7 w-full ${tone === 'dark' ? 'bg-white text-navy' : 'bg-navy text-white'}`}
        >
          <Navigation className="size-5" aria-hidden="true" /> Petunjuk Arah
        </a>
      </div>
      <div ref={ref} className="relative min-h-72 overflow-hidden rounded-[28px] bg-deep/40" data-reveal="right">
        {loadMap ? (
          <iframe
            title={`Peta lokasi ${site.location.name}`}
            src={site.location.mapsEmbed}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">Memuat peta…</div>
        )}
      </div>
    </div>
  )
}
