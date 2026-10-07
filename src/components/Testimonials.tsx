import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, X, ZoomIn } from 'lucide-react'
import { site } from '../content/site'
import { ChatPhone, type Chat } from './ChatPhone'
import { Picture } from './Picture'
import type { ImageName } from '../content/images.generated'

const chats = site.testimonials.chats as unknown as readonly Chat[]

/** Deretan chat testimoni (geser di HP) + poster asli yang bisa diperbesar. */
export function Testimonials({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [poster, setPoster] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const onScroll = () => {
      const w = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 20 : 1
      setActive(Math.round(el.scrollLeft / w))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (poster) dialog.current?.showModal()
    else dialog.current?.close()
  }, [poster])

  const go = (dir: number) => {
    const el = scroller.current
    if (!el) return
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 20
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }
  const muted = tone === 'dark' ? 'text-white/70' : 'text-slate'

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-1 text-sun" aria-label="Rating 5 dari 5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="size-6 fill-current" aria-hidden="true" />
        ))}
      </div>
      <div className="relative">
        <div
          ref={scroller}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc(50vw-150px))] pb-4 md:px-[max(1.25rem,calc(50%-480px))]"
          tabIndex={0}
          aria-label="Testimoni orang tua, geser untuk melihat lainnya"
        >
          {chats.map((c, i) => (
            <ChatPhone key={i} chat={c} />
          ))}
        </div>
        <button type="button" onClick={() => go(-1)} aria-label="Sebelumnya" className="absolute top-[45%] left-0 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg md:flex">
          <ChevronLeft />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Berikutnya" className="absolute top-[45%] right-0 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg md:flex">
          <ChevronRight />
        </button>
      </div>
      <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
        {chats.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-aqua' : `w-1.5 ${tone === 'dark' ? 'bg-white/30' : 'bg-navy/20'}`}`} />
        ))}
      </div>
      <p className={`mx-auto mt-5 max-w-md text-center text-xs ${muted}`}>{site.testimonials.note}</p>

      {/* Poster asli */}
      <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
        {site.testimonials.posters.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setPoster(p)}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-lg"
            aria-label={`Perbesar poster testimoni ${i + 1}`}
          >
            <Picture name={p as ImageName} alt={`Poster testimoni ${i + 1}`} sizes="(min-width: 640px) 190px, 30vw" imgClassName="aspect-[1587/2245] w-full object-cover transition group-hover:scale-105" />
            <span className="absolute right-1.5 bottom-1.5 flex size-7 items-center justify-center rounded-full bg-navy/70 text-white">
              <ZoomIn className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <p className={`mt-2 text-center text-xs ${muted}`}>Ketuk poster untuk memperbesar</p>

      <dialog
        ref={dialog}
        onClose={() => setPoster(null)}
        onClick={(e) => e.target === e.currentTarget && setPoster(null)}
        className="m-auto max-h-[92vh] w-[min(94vw,560px)] overflow-visible bg-transparent p-0 backdrop:bg-navy/85"
      >
        {poster && (
          <div className="relative">
            <Picture name={poster as ImageName} alt="Poster testimoni" sizes="94vw" imgClassName="max-h-[92vh] w-full rounded-2xl object-contain" />
            <button type="button" onClick={() => setPoster(null)} aria-label="Tutup" className="absolute -top-3 -right-3 flex size-11 items-center justify-center rounded-full bg-white text-navy shadow-lg">
              <X />
            </button>
          </div>
        )}
      </dialog>
    </div>
  )
}
