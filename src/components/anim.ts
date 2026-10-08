import { Easing, interpolate, spring } from 'remotion'
import { FPS } from '../timeline.js'

/** Pegas "membal" untuk muncul ala air (0 → 1 dengan sedikit lewat). */
export const pop = (f: number, at: number, damping = 11, mass = 0.7) =>
  f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { damping, mass, stiffness: 140 } })

/** Pegas halus tanpa membal */
export const ease = (f: number, at: number, dur = 18) =>
  interpolate(f, [at, at + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) })

/** Keluar: 1 → 0 */
export const out = (f: number, at: number, dur = 14) =>
  interpolate(f, [at, at + dur], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.55, 0, 0.75, 0.2) })

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

/** Teks bertepi tebal + bayangan (gaya judul poster) lewat text-shadow (stabil di semua browser). */
export function outline(width: number, color: string, drop?: { y: number; color: string }) {
  const parts: string[] = []
  const steps = 24
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    parts.push(`${(Math.cos(a) * width).toFixed(1)}px ${(Math.sin(a) * width).toFixed(1)}px 0 ${color}`)
  }
  if (drop) {
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2
      parts.push(`${(Math.cos(a) * width).toFixed(1)}px ${(Math.sin(a) * width + drop.y).toFixed(1)}px 0 ${drop.color}`)
    }
  }
  return parts.join(',')
}
