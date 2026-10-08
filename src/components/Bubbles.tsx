import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion'

const bubble = (size: number, opacity: number) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  opacity,
  background: 'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0 14%, rgba(255,255,255,0.25) 22%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0.55) 72%, rgba(255,255,255,0) 76%)',
  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.45)',
})

/**
 * Gelembung latar yang selalu naik pelan.
 * Setiap gelembung menempuh bilangan bulat siklus per durasi video → loop mulus.
 */
export function AmbientBubbles({ count = 22, opacity = 0.7 }: { count?: number; opacity?: number }) {
  const frame = useCurrentFrame()
  const { width, height, durationInFrames } = useVideoConfig()
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => {
        // kecepatan ±1 layar per 7–15 detik; dibulatkan ke bilangan bulat siklus agar loop mulus
        const base = 2 + Math.floor(random(`c${i}`) * 3)
        const cycles = Math.max(1, Math.round((base * durationInFrames) / 900))
        const p = (random(`p${i}`) + (frame / durationInFrames) * cycles) % 1
        const size = 10 + random(`s${i}`) * 26
        const x = random(`x${i}`) * width + Math.sin(frame / 18 + i) * 14
        const y = height + 60 - p * (height + 160)
        return <div key={i} style={{ position: 'absolute', left: x, top: y, ...bubble(size, opacity * (0.5 + random(`o${i}`) * 0.5)) }} />
      })}
    </AbsoluteFill>
  )
}

/**
 * Semburan gelembung dari bawah (dipakai di awal & akhir untuk loop).
 * `start` = frame global semburan dimulai (boleh negatif untuk "lanjutan" dari akhir video).
 */
export function BubbleBurst({ start, count = 70, life = 48 }: { start: number; count?: number; life?: number }) {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const age = frame - start
  if (age < 0 || age > life + 30) return null
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => {
        const delay = random(`bd${i}`) * 14
        const a = age - delay
        if (a < 0) return null
        const sp = 0.7 + random(`bs${i}`) * 0.9
        const t = a / life
        const y = height + 80 - (1 - Math.pow(1 - Math.min(t, 1.4) / 1.4, 2)) * (height + 300) * sp
        const x = width * (0.08 + random(`bx${i}`) * 0.84) + Math.sin(a / 5 + i) * 18
        const size = 14 + random(`bz${i}`) * 52
        const o = t < 0.1 ? t / 0.1 : t > 1 ? Math.max(0, 1 - (t - 1) / 0.6) : 1
        return <div key={i} style={{ position: 'absolute', left: x, top: y, ...bubble(size, o * 0.95) }} />
      })}
    </AbsoluteFill>
  )
}
