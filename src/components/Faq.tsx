import { Plus } from 'lucide-react'
import { site } from '../content/site'

/** FAQ memakai <details> bawaan browser: ringan & aksesibel. */
export function Faq({ limit, tone = 'dark' }: { limit?: number; tone?: 'dark' | 'light' }) {
  const items = limit ? site.faq.slice(0, limit) : site.faq
  const card = tone === 'dark' ? 'glass text-white' : 'bg-white text-navy shadow-[0_8px_30px_-12px_rgb(15_32_40/0.2)]'
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {items.map((f, i) => (
        <details key={i} className={`group rounded-3xl ${card} [&_summary::-webkit-details-marker]:hidden`} data-reveal data-delay={String(i * 0.04)}>
          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-left text-[15.5px] font-bold sm:px-6 sm:py-5">
            <span className="flex-1">{f.q}</span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-5" aria-hidden="true" />
            </span>
          </summary>
          <p className={`px-5 pb-5 text-[15px] leading-relaxed sm:px-6 ${tone === 'dark' ? 'text-white/80' : 'text-slate'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
