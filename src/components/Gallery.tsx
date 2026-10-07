import { useEffect, useRef, useState } from 'react'
import { Expand, X } from 'lucide-react'
import { site } from '../content/site'
import { Picture } from './Picture'
import type { ImageName } from '../content/images.generated'

/**
 * Galeri foto: ditampilkan UTUH sesuai rasio aslinya (tidak dipotong/di-zoom)
 * dalam susunan masonry. Ketuk foto untuk memperbesar.
 */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open !== null) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])

  const item = open !== null ? site.gallery[open] : null
  return (
    <>
      <div className="mx-auto max-w-6xl columns-2 gap-3 px-5 md:columns-3 md:gap-5">
        {site.gallery.map((g, i) => (
          <button
            key={g.img}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-3xl bg-deep/40 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)] ring-1 ring-white/10 md:mb-5"
            aria-label={`Perbesar foto: ${g.alt}`}
            data-reveal="zoom"
            data-delay={String((i % 3) * 0.08)}
          >
            <Picture name={g.img as ImageName} alt={g.alt} sizes="(min-width: 768px) 380px, 46vw" imgClassName="block h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
            <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur-sm">
              <Expand className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[94vh] w-[min(96vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-navy/90"
      >
        {item && (
          <figure className="relative">
            <Picture name={item.img as ImageName} alt={item.alt} sizes="96vw" imgClassName="mx-auto max-h-[86vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/80">{item.alt}</figcaption>
            <button type="button" onClick={() => setOpen(null)} aria-label="Tutup" className="absolute -top-3 right-0 flex size-11 items-center justify-center rounded-full bg-white text-navy shadow-lg sm:-right-3">
              <X />
            </button>
          </figure>
        )}
      </dialog>
    </>
  )
}
