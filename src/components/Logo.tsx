interface Props {
  /** 'light' = teks putih (latar gelap), 'dark' = teks navy (latar terang) */
  tone?: 'light' | 'dark'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Logo: simbol asli (gambar) + tulisan HTML agar tajam dan memakai ejaan "CENTER".
 */
export function Logo({ tone = 'light', className = '', size = 'md' }: Props) {
  const mark = size === 'lg' ? 'h-16' : size === 'sm' ? 'h-9' : 'h-11'
  const t1 = size === 'lg' ? 'text-[28px]' : size === 'sm' ? 'text-[15px]' : 'text-[19px]'
  const t2 = size === 'lg' ? 'text-[13.5px]' : size === 'sm' ? 'text-[7.3px]' : 'text-[9.2px]'
  const t3 = size === 'lg' ? 'text-[11px] tracking-[0.55em]' : size === 'sm' ? 'text-[6px] tracking-[0.5em]' : 'text-[7.6px] tracking-[0.52em]'
  const color = tone === 'light' ? 'text-white' : 'text-navy'
  const file = tone === 'light' ? 'logo-mark-light' : 'logo-mark'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Hydro Neuroforge Center">
      <picture>
        <source type="image/avif" srcSet={`/img/${file}-128.avif 128w, /img/${file}-256.avif 256w`} sizes="64px" />
        <img
          src={`/img/${file}-128.webp`}
          srcSet={`/img/${file}-128.webp 128w, /img/${file}-256.webp 256w`}
          sizes="64px"
          alt=""
          width={128}
          height={99}
          className={`${mark} w-auto`}
        />
      </picture>
      <span className={`flex flex-col leading-none font-sans ${color}`} aria-hidden="true">
        <span className={`${t1} font-extrabold tracking-[0.02em]`}>HYDRO</span>
        <span className={`${t2} mt-[2px] font-bold tracking-[0.06em]`}>NEUROFORGE</span>
        <span className={`${t3} mt-[3px] font-medium opacity-90`}>CENTER</span>
      </span>
    </span>
  )
}
