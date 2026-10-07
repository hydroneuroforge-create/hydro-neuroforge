import { Brain, HeartHandshake, Move, Sparkles } from 'lucide-react'

const map = { brain: Brain, heart: HeartHandshake, sparkles: Sparkles, move: Move } as const

export function BenefitIcon({ name, className = 'size-7' }: { name: string; className?: string }) {
  const Icon = map[name as keyof typeof map] ?? Sparkles
  return <Icon className={className} aria-hidden="true" />
}
