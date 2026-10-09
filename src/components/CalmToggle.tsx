import { Moon, Waves } from 'lucide-react'
import { setCalm, useCalm } from '../lib/calm'

export function CalmToggle({ className = '' }: { className?: string }) {
  const calm = useCalm()
  return (
    <button
      type="button"
      onClick={() => setCalm(!calm)}
      aria-pressed={calm}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 text-xs font-semibold text-white/90 transition hover:bg-white/10 ${className}`}
      title={calm ? 'Nyalakan kembali animasi' : 'Matikan animasi & efek 3D'}
    >
      {calm ? <Waves className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
      <span>{calm ? 'Mode Animasi' : 'Mode Tenang'}</span>
    </button>
  )
}
