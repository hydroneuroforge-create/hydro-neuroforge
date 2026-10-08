import { content } from '../content'
import { EV } from '../timeline.js'
import { C } from '../theme'
import { FONT } from '../fonts'
import { Blob } from '../components/Blob'
import { Pin } from '../components/Illustrations'
import { abs, Stage, STAGE_W, useSceneFrame } from '../components/layout'
import { out, pop } from '../components/anim'

/** Adegan 3: suasana kolam dalam bingkai blob. */
export function Suasana({ len }: { len: number }) {
  const { f } = useSceneFrame('suasana', len)
  const e = EV.suasana
  const o = out(f, e.exit, 14)
  const lift = (1 - o) * -140
  const cap = pop(f, e.caption, 10) * o
  return (
    <Stage>
      <div style={abs((STAGE_W - 900) / 2, 60 + lift, 900, 740)}>
        <Blob w={900} h={740} seed="s1" src={content.suasana.big} show={pop(f, e.b1, 13) * o} zoom={1.04 + f / 1500} focus="50% 55%" border={14} />
      </div>
      <div style={abs(30, 690 + lift * 1.3, 330, 420, { transform: 'rotate(-5deg)' })}>
        <Blob w={330} h={420} seed="s2" src={content.suasana.small1} show={pop(f, e.b2, 11) * o} zoom={1.06} focus="50% 55%" />
      </div>
      <div style={abs(620, 760 + lift * 1.3, 420, 340, { transform: 'rotate(5deg)' })}>
        <Blob w={420} h={340} seed="s3" src={content.suasana.small2} show={pop(f, e.b3, 11) * o} zoom={1.06} focus="55% 45%" />
      </div>
      <div style={abs(0, 1130, STAGE_W, undefined, { display: 'flex', justifyContent: 'center' })}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '18px 34px 18px 22px',
            borderRadius: 999,
            background: C.white,
            boxShadow: '0 14px 30px rgba(15,32,40,0.25)',
            transform: `scale(${cap})`,
            fontFamily: FONT.body,
            fontWeight: 800,
            fontSize: 44,
            color: C.navy,
          }}
        >
          <Pin size={54} />
          {content.suasana.caption}
        </div>
      </div>
    </Stage>
  )
}
