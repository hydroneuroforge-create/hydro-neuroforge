import { images, type ImageName } from '../content/images.generated'

interface Props {
  name: ImageName
  alt: string
  /** atribut sizes, mis. "(min-width: 768px) 50vw, 100vw" */
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

/** Gambar responsif AVIF + WebP dengan ukuran otomatis. */
export function Picture({ name, alt, sizes = '100vw', className, imgClassName, priority }: Props) {
  const meta = images[name]
  const set = (ext: string) => meta.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `/img/${name}-${meta.widths[Math.min(1, meta.widths.length - 1)]}.webp`
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  )
}
