import type { CSSProperties } from 'react'
import { FONT } from '../fonts'
import { outline, pop } from './anim'

/**
 * Teks judul yang hurufnya "jatuh ke air" lalu memantul & mengapung.
 * f = frame lokal (nominal), start = frame huruf pertama, gap = jeda antarhuruf.
 */
export function BouncyText({
  text,
  f,
  start,
  gap,
  size,
  fill,
  stroke,
  shadow,
  sink = 0,
  style,
}: {
  text: string
  f: number
  start: number
  gap: number
  size: number
  fill: string
  stroke: string
  shadow: string
  /** 0..1 huruf tenggelam (keluar) */
  sink?: number
  style?: CSSProperties
}) {
  const ts = outline(size * 0.075, stroke, { y: size * 0.07, color: shadow })
  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 1, color: fill, textShadow: ts, ...style }}>
      {text.split('').map((ch, i) => {
        const at = start + i * gap
        const s = pop(f, at, 9, 0.6)
        const y = (1 - s) * -size * 2.4 + Math.sin((f - at) / 7 + i * 0.9) * (f > at + 12 ? size * 0.035 : 0)
        const rot = (1 - s) * (i % 2 ? 14 : -14) + Math.sin((f - at) / 9 + i) * (f > at + 12 ? 2.5 : 0)
        const sk = Math.min(1, Math.max(0, sink * 1.6 - (i / text.length) * 0.6))
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              opacity: f < at ? 0 : 1 - sk,
              transform: `translateY(${y + sk * size * 1.5}px) rotate(${rot}deg) scale(${1 - sk * 0.3})`,
            }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}
