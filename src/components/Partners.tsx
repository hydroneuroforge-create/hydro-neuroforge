import { BookOpenCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Picture } from './Picture'

type Key = 'aasm' | 'yasi' | 'harvard'

/** Lencana kepercayaan: naungan, partner, riset. Pakai `only` untuk memilih yang ditampilkan. */
export function Partners({ tone = 'dark', only = ['aasm', 'yasi', 'harvard'] }: { tone?: 'dark' | 'light'; only?: Key[] }) {
  const card = tone === 'dark' ? 'glass' : 'bg-white shadow-[0_14px_40px_-18px_rgb(15_32_40/0.25)]'
  const sub = tone === 'dark' ? 'text-white/65' : 'text-slate'
  const items: Record<Key, { icon: ReactNode; label: string; name: string }> = {
    aasm: {
      icon: <Picture name="logo-aasm" alt="Logo Association Aquatic of Sport Medicine" sizes="80px" imgClassName="h-12 w-auto object-contain" />,
      label: 'Di bawah naungan',
      name: 'Association Aquatic of Sport Medicine',
    },
    yasi: {
      icon: <Picture name="logo-yasi" alt="Logo Yayasan Anak Spesial Indonesia" sizes="64px" imgClassName="h-12 w-auto object-contain" />,
      label: 'Partner resmi',
      name: 'Yayasan Anak Spesial Indonesia',
    },
    harvard: {
      icon: <BookOpenCheck className="size-8 text-sun" aria-hidden="true" />,
      label: 'Berlandaskan riset',
      name: 'Center on the Developing Child, Harvard University',
    },
  }
  const cols = only.length >= 3 ? 'sm:grid-cols-3' : only.length === 2 ? 'sm:grid-cols-2' : 'mx-auto max-w-md'
  return (
    <div className={`grid gap-4 ${cols}`}>
      {only.map((k, i) => (
        <div key={k} className={`flex items-center gap-4 rounded-3xl p-5 ${card}`} data-reveal data-delay={String(i * 0.08)}>
          <span className={`flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl ${k === 'harvard' ? 'bg-sun/20' : 'bg-white'}`}>{items[k].icon}</span>
          <span>
            <span className={`block text-xs font-bold tracking-wider uppercase ${sub}`}>{items[k].label}</span>
            <span className="font-bold leading-snug">{items[k].name}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
