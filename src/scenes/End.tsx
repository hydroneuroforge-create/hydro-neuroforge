import type { ReactNode } from 'react'
import { content } from '../content'
import { EV } from '../timeline.js'
import { C } from '../theme'
import { FONT } from '../fonts'
import { NeuralNet } from '../components/Effects'
import { GlobeIcon, IgIcon } from '../components/Illustrations'
import { abs, Stage, STAGE_W, useSceneFrame } from '../components/layout'
import { clamp01, ease, pop } from '../components/anim'
import { LOGO_CARD, LogoCard } from './Intro'

/** Adegan 6: logo + slogan + tautan, lalu tenggelam kembali (menyambung ke awal = loop). */
export function End({ len }: { len: number }) {
  const { f } = useSceneFrame('end', len)
  const e = EV.end
  const sink = ease(f, e.sink, e.sinkLen)
  const logo = pop(f, e.logo, 10)
  const sl = pop(f, e.slogan, 11)
  const ln1 = pop(f, e.links, 11)
  const ln2 = pop(f, e.links + 5, 11)
  const sweep = clamp01((f - e.slogan - 8) / 34)
  const down = sink * 900
  const pill = (icon: ReactNode, text: string, s: number) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 34px 18px 24px',
        borderRadius: 999,
        background: C.white,
        boxShadow: '0 12px 26px rgba(15,32,40,0.22)',
        fontFamily: FONT.body,
        fontWeight: 800,
        fontSize: 44,
        color: C.navy,
        transform: `scale(${s})`,
      }}
    >
      {icon}
      {text}
    </div>
  )
  return (
    <Stage style={{ opacity: 1 - sink }}>
      <div style={abs((STAGE_W - 900) / 2, 120 + down, 900, 560, { opacity: 0.6 })}>
        <NeuralNet w={900} h={560} p={clamp01(f / 50)} opacity={0.6} />
      </div>
      <div style={abs((STAGE_W - LOGO_CARD.w) / 2, 200 + down, LOGO_CARD.w, LOGO_CARD.h)}>
        <LogoCard show={logo} seed="logo" />
      </div>

      <div style={abs(0, 690 + down * 1.1, STAGE_W, undefined, { display: 'flex', justifyContent: 'center' })}>
        <div
          style={{
            maxWidth: 860,
            textAlign: 'center',
            padding: '24px 44px',
            borderRadius: 40,
            background: 'rgba(15,32,40,0.82)',
            boxShadow: '0 16px 36px rgba(15,32,40,0.35)',
            transform: `scale(${sl})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.display,
              fontWeight: 600,
              fontSize: 64,
              lineHeight: 1.12,
              // backgroundImage (bukan shorthand `background`) agar background-clip: text tidak tereset tiap frame
              backgroundImage: `linear-gradient(100deg, #fff 0%, #fff ${(sweep * 140 - 40).toFixed(1)}%, ${C.sun} ${(sweep * 140 - 20).toFixed(1)}%, #fff ${(sweep * 140).toFixed(1)}%, #fff 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {content.end.slogan}
          </div>
        </div>
      </div>

      <div style={abs(0, 960 + down * 1.2, STAGE_W, undefined, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 })}>
        {pill(<GlobeIcon size={46} color={C.deep} />, content.end.website, ln1)}
        {pill(<IgIcon size={46} color="#D6249F" />, content.end.instagram, ln2)}
      </div>
    </Stage>
  )
}
