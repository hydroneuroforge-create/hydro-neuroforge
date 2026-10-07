import { BookOpenCheck } from 'lucide-react'
import { Picture } from './Picture'

/** Lencana kepercayaan: riset, naungan, partner. */
export function Partners({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const card = tone === 'dark' ? 'glass' : 'bg-white shadow-[0_14px_40px_-18px_rgb(15_32_40/0.25)]'
  const sub = tone === 'dark' ? 'text-white/65' : 'text-slate'
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className={`flex items-center gap-4 rounded-3xl p-5 ${card}`} data-reveal>
        <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-white">
          <Picture name="logo-aasm" alt="Logo Association Aquatic of Sport Medicine" sizes="80px" imgClassName="h-12 w-auto object-contain" />
        </span>
        <span>
          <span className={`block text-xs font-bold tracking-wider uppercase ${sub}`}>Di bawah naungan</span>
          <span className="font-bold leading-snug">Association Aquatic of Sport Medicine</span>
        </span>
      </div>
      <div className={`flex items-center gap-4 rounded-3xl p-5 ${card}`} data-reveal data-delay="0.08">
        <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-white">
          <Picture name="logo-yasi" alt="Logo Yayasan Anak Spesial Indonesia" sizes="64px" imgClassName="h-12 w-auto object-contain" />
        </span>
        <span>
          <span className={`block text-xs font-bold tracking-wider uppercase ${sub}`}>Partner resmi</span>
          <span className="font-bold leading-snug">Yayasan Anak Spesial Indonesia</span>
        </span>
      </div>
      <div className={`flex items-center gap-4 rounded-3xl p-5 ${card}`} data-reveal data-delay="0.16">
        <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-sun/20 text-sun">
          <BookOpenCheck className="size-8" aria-hidden="true" />
        </span>
        <span>
          <span className={`block text-xs font-bold tracking-wider uppercase ${sub}`}>Berlandaskan riset</span>
          <span className="font-bold leading-snug">Center on the Developing Child, Harvard University</span>
        </span>
      </div>
    </div>
  )
}
