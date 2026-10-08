import { Img, staticFile } from 'remotion'
import { content } from '../content'
import { FONT } from '../fonts'
import { C } from '../theme'
import { clamp01 } from './anim'

/**
 * Logo: simbol asli + tulisan HYDRO / NEUROFORGE / CENTER.
 * `reveal` 0..1 memunculkan tulisan huruf demi huruf.
 */
export function Logo({ height = 240, reveal = 1, tone = 'dark' }: { height?: number; reveal?: number; tone?: 'dark' | 'light' }) {
  const s = height / 240
  const color = tone === 'dark' ? C.navy : C.white
  const letters = (text: string, from: number, to: number) =>
    text.split('').map((ch, i, arr) => {
      const p = clamp01((reveal - (from + ((to - from) * i) / arr.length)) / 0.12)
      return (
        <span key={i} style={{ display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 18 * s}px)` }}>
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      )
    })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 * s }}>
      <Img src={staticFile(tone === 'dark' ? 'img/logo-mark.png' : 'img/logo-mark-light.png')} style={{ height, width: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', color, fontFamily: FONT.body, lineHeight: 1 }}>
        <span style={{ fontSize: 92 * s, fontWeight: 800, letterSpacing: '0.02em' }}>{letters(content.brand.line1, 0, 0.45)}</span>
        <span style={{ fontSize: 44 * s, fontWeight: 700, letterSpacing: '0.05em', marginTop: 8 * s }}>{letters(content.brand.line2, 0.2, 0.7)}</span>
        <span style={{ fontSize: 33 * s, fontWeight: 500, letterSpacing: '0.62em', marginTop: 12 * s }}>{letters(content.brand.line3, 0.45, 0.88)}</span>
      </div>
    </div>
  )
}
