import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion'
import { clamp01 } from './anim'

/** Cincin riak yang melebar dari satu titik. */
export function Ripples({ x, y, start, count = 3, color = '#fff', maxR = 520 }: { x: number; y: number; start: number; count?: number; color?: string; maxR?: number }) {
  const f = useCurrentFrame()
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1} height={1}>
      {Array.from({ length: count }, (_, i) => {
        const a = f - start - i * 7
        if (a < 0 || a > 50) return null
        const p = a / 50
        const r = 30 + p * maxR
        return <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.36} fill="none" stroke={color} strokeWidth={10 * (1 - p) + 1} opacity={(1 - p) * 0.9} />
      })}
    </svg>
  )
}

/**
 * Ombak besar yang menyapu layar dari bawah ke atas (transisi).
 * Menutupi layar penuh di frame `start + dur/2`.
 */
export function WaveWipe({ start, dur = 36 }: { start: number; dur?: number }) {
  const f = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const p = (f - start) / dur
  if (p < 0 || p > 1) return null
  const layers = [
    { color: '#FFFFFF', lag: 0, amp: 46, k: 2.2 },
    { color: '#8FE0EE', lag: 0.06, amp: 56, k: 1.7 },
    { color: '#2EA8C4', lag: 0.12, amp: 64, k: 1.4 },
    { color: '#1D7896', lag: 0.18, amp: 50, k: 1.9 },
  ]
  const total = height * 2.6
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {layers.map((l, i) => {
          const q = clamp01((p - l.lag) / (1 - l.lag * 1.2))
          // tepi atas ombak bergerak dari bawah layar ke atas
          const top = height + 120 - q * total
          let d = `M 0 ${top}`
          for (let x = 0; x <= width; x += 40) {
            const y = top + Math.sin((x / width) * Math.PI * l.k + f / 3 + i) * l.amp
            d += ` L ${x} ${y.toFixed(1)}`
          }
          d += ` L ${width} ${top + height * 1.4} L 0 ${top + height * 1.4} Z`
          return <path key={i} d={d} fill={l.color} />
        })}
        {/* buih */}
        {Array.from({ length: 26 }, (_, i) => {
          const q = clamp01(p / 0.82)
          const top = height + 120 - q * total
          const x = random(`wf${i}`) * width
          const y = top - 20 - random(`wy${i}`) * 90 + Math.sin(f / 4 + i) * 10
          return <circle key={i} cx={x} cy={y} r={6 + random(`wr${i}`) * 16} fill="#fff" opacity={0.9} />
        })}
      </svg>
    </AbsoluteFill>
  )
}

/** Motif jaringan saraf bercahaya (simbol "Neuroforge"). `p` 0..1 = progres terbentuk. */
export function NeuralNet({ w, h, p, opacity = 0.5, color = '#ffffff' }: { w: number; h: number; p: number; opacity?: number; color?: string }) {
  const f = useCurrentFrame()
  const nodes = Array.from({ length: 34 }, (_, i) => {
    // dua belahan otak: elips kiri & kanan
    const side = i % 2 === 0 ? -1 : 1
    const a = random(`na${i}`) * Math.PI * 2
    const r = Math.sqrt(random(`nr${i}`))
    return { x: w / 2 + side * (w * 0.03 + Math.abs(Math.cos(a)) * r * w * 0.22), y: h / 2 + Math.sin(a) * r * h * 0.4 }
  })
  const links: [number, number][] = []
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j > i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    near.forEach((o) => links.push([i, o.j]))
  })
  return (
    <svg width={w} height={h} style={{ opacity }}>
      {links.map(([a, b], k) => {
        const q = clamp01(p * 1.4 - (k / links.length) * 0.6)
        const A = nodes[a], B = nodes[b]
        return <line key={k} x1={A.x} y1={A.y} x2={A.x + (B.x - A.x) * q} y2={A.y + (B.y - A.y) * q} stroke={color} strokeWidth={3} strokeLinecap="round" opacity={0.7} />
      })}
      {nodes.map((n, i) => {
        const q = clamp01(p * 1.5 - (i / nodes.length) * 0.5)
        const pulse = 0.6 + 0.4 * Math.sin(f / 7 + i * 1.3)
        return <circle key={i} cx={n.x} cy={n.y} r={(5 + 5 * pulse) * q} fill={color} />
      })}
    </svg>
  )
}
