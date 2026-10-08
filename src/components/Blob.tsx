import { noise3D } from '@remotion/noise'
import type { CSSProperties, ReactNode } from 'react'
import { Img, staticFile, useCurrentFrame } from 'remotion'

/** Path blob organik (seperti tetesan air) yang bentuknya bergoyang pelan, deterministik. */
export function blobPath(w: number, h: number, seed: string, t: number, amp = 0.07, n = 9) {
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const r = 0.9 + amp * noise3D(seed, Math.cos(a) * 0.9, Math.sin(a) * 0.9, t)
    pts.push([w / 2 + (w / 2) * r * Math.cos(a), h / 2 + (h / 2) * r * Math.sin(a)])
  }
  // Catmull-Rom tertutup → Bezier kubik
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + ' Z'
}

interface Props {
  w: number
  h: number
  seed: string
  /** foto (path di public/) — bila kosong, isi dengan `fill` / children */
  src?: string
  fill?: string
  focus?: string
  /** 0..1 untuk animasi muncul (skala) */
  show?: number
  /** zoom pelan Ken Burns (1 = tanpa zoom) */
  zoom?: number
  border?: number
  borderColor?: string
  style?: CSSProperties
  children?: ReactNode
  amp?: number
}

export function Blob({ w, h, seed, src, fill = '#fff', focus = '50% 50%', show = 1, zoom = 1, border = 10, borderColor = '#fff', style, children, amp }: Props) {
  const frame = useCurrentFrame()
  const d = blobPath(w, h, seed, frame / 55, amp)
  if (show <= 0.001) return null
  return (
    <div style={{ width: w, height: h, transform: `scale(${show})`, filter: 'drop-shadow(0 18px 28px rgba(15,32,40,0.28))', ...style }}>
      <div style={{ position: 'absolute', inset: 0, clipPath: `path('${d}')`, background: fill, overflow: 'hidden' }}>
        {src && (
          <Img
            src={staticFile(src)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, transform: `scale(${zoom})`, transformOrigin: focus }}
          />
        )}
        {children}
      </div>
      {border > 0 && (
        <svg width={w} height={h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <path d={d} fill="none" stroke={borderColor} strokeWidth={border} />
        </svg>
      )}
    </div>
  )
}
