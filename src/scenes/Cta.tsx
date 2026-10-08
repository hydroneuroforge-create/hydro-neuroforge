import { content } from '../content'
import { EV } from '../timeline.js'
import { C } from '../theme'
import { FONT } from '../fonts'
import { Ripples } from '../components/Effects'
import { Pin, WaIcon } from '../components/Illustrations'
import { abs, Stage, STAGE_W, useSceneFrame } from '../components/layout'
import { out, outline, pop } from '../components/anim'

/** Adegan 5: ajakan konsultasi gratis via WhatsApp + lokasi. */
export function Cta({ len }: { len: number }) {
  const { f } = useSceneFrame('cta', len)
  const e = EV.cta
  const o = out(f, 136, 14)
  const word = (text: string, at: number, size: number, color: string, y: number) => {
    const s = pop(f, at, 9)
    return (
      <div
        style={abs(0, y, STAGE_W, undefined, {
          textAlign: 'center',
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1,
          color,
          textShadow: outline(size * 0.07, '#2B86C5', { y: size * 0.07, color: '#1D5A8C' }),
          transform: `scale(${s}) rotate(${(1 - s) * -8}deg)`,
          opacity: o,
        })}
      >
        {text}
      </div>
    )
  }
  const wa = pop(f, e.wa, 10) * o
  const pulse = 1 + Math.max(0, Math.sin((f - e.wa - 20) / 6)) * 0.035 * (f > e.wa + 20 ? 1 : 0)
  const loc = pop(f, e.loc, 11) * o
  const hrs = pop(f, e.hours, 12) * o
  return (
    <Stage>
      {word(content.cta.line1, e.w1, 112, C.white, 70)}
      {word(content.cta.line2, e.w2, 196, C.sun, 200)}
      {word(content.cta.line3, e.w3, 112, C.white, 420)}

      <Ripples x={STAGE_W / 2} y={710} start={e.wa + 4} count={3} maxR={520} />
      <div style={abs(0, 630, STAGE_W, 160, { display: 'flex', justifyContent: 'center' })}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            padding: '26px 48px',
            borderRadius: 999,
            background: C.wa,
            color: C.white,
            fontFamily: FONT.body,
            fontWeight: 800,
            fontSize: 66,
            letterSpacing: '0.01em',
            boxShadow: '0 14px 0 #149C4A, 0 26px 44px rgba(15,32,40,0.35)',
            transform: `scale(${wa * pulse})`,
          }}
        >
          <WaIcon size={84} />
          {content.cta.whatsapp}
        </div>
      </div>

      <div style={abs(0, 850, STAGE_W, undefined, { display: 'flex', justifyContent: 'center' })}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '22px 40px 22px 26px',
            borderRadius: 34,
            background: C.white,
            boxShadow: '0 16px 32px rgba(15,32,40,0.25)',
            transform: `scale(${loc})`,
          }}
        >
          <Pin size={78} />
          <div style={{ fontFamily: FONT.body, color: C.navy, lineHeight: 1.15 }}>
            <div style={{ fontWeight: 800, fontSize: 46 }}>{content.cta.location}</div>
            <div style={{ fontWeight: 500, fontSize: 34, color: C.deep }}>{content.cta.city}</div>
          </div>
        </div>
      </div>

      <div style={abs(0, 1050, STAGE_W, undefined, { display: 'flex', justifyContent: 'center', opacity: hrs, transform: `translateY(${(1 - hrs) * 30}px)` })}>
        <div style={{ padding: '12px 30px', borderRadius: 999, background: 'rgba(15,32,40,0.78)', fontFamily: FONT.body, fontWeight: 700, fontSize: 38, color: C.white }}>{content.cta.hours}</div>
      </div>
    </Stage>
  )
}
