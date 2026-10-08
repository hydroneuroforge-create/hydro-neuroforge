import { interpolate } from 'remotion'
import { EV } from '../timeline.js'
import { Blob } from '../components/Blob'
import { Ripples } from '../components/Effects'
import { abs, Stage, STAGE_W, useSceneFrame } from '../components/layout'
import { Logo } from '../components/Logo'
import { ease, pop } from '../components/anim'

/** Kartu logo di tengah (dipakai juga oleh adegan judul sebagai header). */
export const LOGO_CARD = { w: 820, h: 400 }
export const HEADER = { scale: 0.52, y: 0 }

export function LogoCard({ reveal = 1, show = 1, seed = 'logo' }: { reveal?: number; show?: number; seed?: string }) {
  return (
    <Blob w={LOGO_CARD.w} h={LOGO_CARD.h} seed={seed} show={show} border={0} amp={0.05}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Logo height={236} reveal={reveal} />
      </div>
    </Blob>
  )
}

/** Adegan 1: muncul dari dalam air → logo terbentuk → mengecil menjadi header. */
export function Intro({ len }: { len: number }) {
  const { f } = useSceneFrame('intro', len)
  const e = EV.intro
  const show = pop(f, e.logo, 10, 0.8)
  const reveal = interpolate(f, [e.logo + 6, e.logo + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const m = ease(f, e.exit, 80 - e.exit)
  const cx = (STAGE_W - LOGO_CARD.w) / 2
  const cy = 430
  const scale = 1 + (HEADER.scale - 1) * m
  const y = cy + (HEADER.y - cy - (LOGO_CARD.h * (1 - HEADER.scale)) / 2) * m
  return (
    <Stage>
      <Ripples x={STAGE_W / 2} y={cy + LOGO_CARD.h / 2} start={e.surface} count={4} maxR={620} />
      <div style={abs(cx, y, LOGO_CARD.w, LOGO_CARD.h, { transform: `scale(${scale})` })}>
        <LogoCard show={show} reveal={reveal} />
      </div>
    </Stage>
  )
}
