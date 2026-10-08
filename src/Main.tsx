import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion'
import { sinkFrame, surfaceFrame, VARIANTS, WAVE_LEAD, type Scene } from './timeline.js'
import { AmbientBubbles, BubbleBurst } from './components/Bubbles'
import { WaveWipe } from './components/Effects'
import { LayoutProvider } from './components/layout'
import { Water } from './components/Water'
import { Benefits } from './scenes/Benefits'
import { Cta } from './scenes/Cta'
import { End } from './scenes/End'
import { Intro } from './scenes/Intro'
import { Suasana } from './scenes/Suasana'
import { Title } from './scenes/Title'

export type VariantId = keyof typeof VARIANTS
export type AudioMode = 'mix' | 'sfx' | 'none'
export interface MainProps extends Record<string, unknown> {
  variant: VariantId
  audio: AudioMode
}

function SceneView({ s, variant }: { s: Scene; variant: VariantId }) {
  const v = VARIANTS[variant]
  switch (s.name) {
    case 'intro':
      return <Intro len={s.len} />
    case 'title':
      return <Title len={s.len} />
    case 'suasana':
      return <Suasana len={s.len} />
    case 'benefits':
      return <Benefits len={s.len} first={v.benefits.first} per={v.benefits.per} />
    case 'cta':
      return <Cta len={s.len} />
    case 'end':
      return <End len={s.len} />
  }
}

export function Main({ variant, audio }: MainProps) {
  const v = VARIANTS[variant]
  const frame = useCurrentFrame()
  const sink = sinkFrame(v)
  const surface = surfaceFrame(v)
  const lead = v.duration - sink
  // kedalaman air: awal di bawah air → permukaan → akhir kembali ke bawah air (loop)
  const depth = interpolate(frame, [0, surface - 4, surface + 18, sink, sink + lead * 0.7, v.duration], [1, 1, 0, 0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const ripple = frame >= surface - 2 && frame < surface + 90 ? { x: 540, y: v.stageTop + 630, age: (frame - surface + 2) / 30 } : undefined
  const cta = v.scenes.find((s) => s.name === 'cta')!

  return (
    <LayoutProvider stageTop={v.stageTop}>
      <AbsoluteFill style={{ backgroundColor: '#7FD3EA' }}>
        <Water depth={depth} ripple={ripple} />
        <AmbientBubbles count={18} opacity={0.6} />
        {v.scenes.map((s) => (
          <Sequence key={s.name} from={s.from} durationInFrames={s.len} layout="none">
            <SceneView s={s} variant={variant} />
          </Sequence>
        ))}
        <BubbleBurst start={-lead} />
        <BubbleBurst start={sink} />
        <WaveWipe start={cta.from - WAVE_LEAD} dur={WAVE_LEAD * 2} />
        {audio !== 'none' && <Audio src={staticFile(`audio/${variant}-${audio}.wav`)} />}
      </AbsoluteFill>
    </LayoutProvider>
  )
}
