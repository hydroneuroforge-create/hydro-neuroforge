import { useEffect, useRef, useState } from 'react'
import { Expand, X } from 'lucide-react'
import { site } from '../content/site'
import { images, type ImageName } from '../content/images.generated'
import { Picture } from './Picture'

type Item = (typeof site.gallery)[number] & { index: number }

/**
 * Bagi foto ke 2 kolom (masonry) berdasarkan rasio asli, selalu ke kolom yang paling pendek.
 * Sengaja TIDAK memakai CSS `columns`: di Safari iPhone, gambar lazy-load di dalam
 * multi-column kadang tidak pernah tampil.
 */
function toColumns(count: number): Item[][] {
  const cols: Item[][] = Array.from({ length: count }, () => [])
  const heights = new Array(count).fill(0)
  site.gallery.forEach((g, index) => {
    const m = images[g.img as ImageName]
    const c = heights.indexOf(Math.min(...heights))
    cols[c].push({ ...g, index })
    heights[c] += m.h / m.w
  })
  return cols
}

/** Galeri foto: ditampilkan UTUH sesuai rasio aslinya (tidak dipotong/di-zoom). Ketuk untuk memperbesar. */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open !== null) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])

  const item = open !== null ? site.gallery[open] : null
  const columns = toColumns(2)
  return (
    <>
      <div className="mx-auto flex max-w-4xl items-start gap-3 px-5 md:gap-5">
        {columns.map((col, ci) => (
          <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 md:gap-5">
            {col.map((g) => {
              const m = images[g.img as ImageName]
              return (
                <button
                  key={g.img}
                  type="button"
                  onClick={() => setOpen(g.index)}
                  className="group relative block w-full overflow-hidden rounded-3xl bg-deep/40 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
                  style={{ aspectRatio: `${m.w} / ${m.h}` }}
                  aria-label={`Perbesar foto: ${g.alt}`}
                  data-reveal="zoom"
                  data-delay={String(g.index * 0.06)}
                >
                  <Picture
                    name={g.img as ImageName}
                    alt={g.alt}
                    sizes="(min-width: 768px) 440px, 46vw"
                    className="block size-full"
                    imgClassName="block size-full object-cover transition duration-500 md:group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur-sm">
                    <Expand className="size-4" aria-hidden="true" />
                  </span>
                </button>
              )
            })}
          </div>
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
