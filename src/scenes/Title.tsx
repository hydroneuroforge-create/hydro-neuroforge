import { interpolate } from 'remotion'
import { content } from '../content'
import { EV } from '../timeline.js'
import { C } from '../theme'
import { Blob } from '../components/Blob'
import { BouncyText } from '../components/BouncyText'
import { Ripples } from '../components/Effects'
import { Snorkel, Swimmer } from '../components/Illustrations'
import { abs, Stage, STAGE_W, useSceneFrame } from '../components/layout'
import { ease, out, pop } from '../components/anim'
import { HEADER, LOGO_CARD, LogoCard } from './Intro'

/** Adegan 2: judul "HYDROTHERAPY for SPECIAL NEEDS" ala poster. */
export function Title({ len }: { len: number }) {
  const { f } = useSceneFrame('title', len)
  const e = EV.title
  const sink = ease(f, e.exit, 14)
  const fade = out(f, e.exit + 2, 12)
  const ph1 = pop(f, e.photos, 12) * fade
  const ph2 = pop(f, e.photos + 5, 12) * fade
  const swimX = interpolate(f, [e.swimIn, e.swimOut], [-380, STAGE_W + 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const forS = pop(f, e.forPop, 8) * (1 - sink)
  const sn = pop(f, e.snorkel, 10) * fade
  const header = { x: (STAGE_W - LOGO_CARD.w) / 2, y: HEADER.y - (LOGO_CARD.h * (1 - HEADER.scale)) / 2 }
  return (
    <Stage>
      {/* foto kiri & kanan logo (seperti poster) */}
      <div style={abs(-30, 10, 330, 300, { transform: `rotate(-6deg) translateY(${(1 - fade) * -60}px)` })}>
        <Blob w={330} h={300} seed="t1" src={content.titlePhotos[0]} show={ph1} zoom={1.05 + f / 2000} focus="40% 55%" />
      </div>
      <div style={abs(790, 0, 330, 300, { transform: `rotate(7deg) translateY(${(1 - fade) * -60}px)` })}>
        <Blob w={330} h={300} seed="t2" src={content.titlePhotos[1]} show={ph2} zoom={1.05 + f / 2000} focus="68% 50%" />
      </div>
      {/* header logo */}
      <div style={abs(header.x, header.y, LOGO_CARD.w, LOGO_CARD.h, { transform: `scale(${HEADER.scale}) translateY(${Math.sin(f / 14) * 6 - (1 - fade) * 120}px)`, opacity: fade })}>
        <LogoCard seed="logo" />
      </div>

      {/* judul */}
      <Ripples x={STAGE_W / 2} y={540} start={e.hydroStart + 9} count={3} maxR={460} />
      <BouncyText text={content.title.top} f={f} start={e.hydroStart} gap={e.hydroGap} size={128} fill={C.white} stroke="#2B86C5" shadow="#1D5A8C" sink={sink} style={abs(0, 380, STAGE_W)} />
      <div style={abs(0, 555, STAGE_W, undefined, { display: 'flex', justifyContent: 'center', transform: `scale(${forS})` })}>
        <BouncyText text={content.title.mid} f={f} start={e.forPop - 9} gap={0} size={92} fill={C.white} stroke="#2B86C5" shadow="#1D5A8C" />
      </div>
      <BouncyText text={content.title.bottom} f={f} start={e.needsStart} gap={e.needsGap} size={134} fill={C.sun} stroke="#2B86C5" shadow="#1D5A8C" sink={sink} style={abs(0, 700, STAGE_W)} />

      {/* snorkel & perenang */}
      <div style={abs(770, 500, 150, 150, { transform: `scale(${sn})` })}>
        <Snorkel size={150} />
      </div>
      <div style={abs(swimX, 1000, 340, 190)}>
        <Swimmer size={340} />
      </div>
    </Stage>
  )
}
