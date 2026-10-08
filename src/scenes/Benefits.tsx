import { Brain, HeartHandshake, Move, Sparkles } from 'lucide-react'
import { interpolate, useCurrentFrame } from 'remotion'
import { content } from '../content'
import { C } from '../theme'
import { FONT } from '../fonts'
import { Blob } from '../components/Blob'
import { NeuralNet } from '../components/Effects'
import { Arrow } from '../components/Illustrations'
import { abs, Stage, STAGE_W } from '../components/layout'
import { clamp01, ease, pop } from '../components/anim'

const icons = { brain: Brain, heart: HeartHandshake, sparkles: Sparkles, move: Move } as const

/**
 * Adegan 4: "MANFAAT HYDROTHERAPY" + 4 poin.
 * Waktu memakai frame mentah (first/per diatur per versi di timeline.js).
 */
export function Benefits({ len, first, per }: { len: number; first: number; per: number }) {
  const f = useCurrentFrame()
  const k = first / 30
  const banner = pop(f, 0, 12)
  const active = Math.max(-1, Math.min(3, Math.floor((f - first) / per)))
  const PHOTO = { w: 860, h: 600, y: 120 }
  return (
    <Stage>
      {/* pita judul */}
      <div style={abs(0, 0, STAGE_W, 100, { display: 'flex', justifyContent: 'center' })}>
        <div
          style={{
            transform: `translateX(${(1 - banner) * -900}px)`,
            background: '#1C5E8A',
            color: C.white,
            fontFamily: FONT.banner,
            fontWeight: 600,
            fontSize: 70,
            letterSpacing: '0.02em',
            padding: '10px 44px 14px',
            borderRadius: 26,
            boxShadow: '0 12px 0 #12405F, 0 20px 36px rgba(15,32,40,0.3)',
          }}
        >
          {content.benefitsTitle}
        </div>
      </div>

      {/* jaringan saraf di belakang foto */}
      <div style={abs((STAGE_W - 1000) / 2, PHOTO.y - 40, 1000, PHOTO.h + 80)}>
        <NeuralNet w={1000} h={PHOTO.h + 80} p={interpolate(f, [10 * k, len * 0.8], [0, 1], { extrapolateRight: 'clamp' })} opacity={0.55} />
      </div>

      {/* foto per poin */}
      {content.benefits.map((b, i) => {
        const at = first + i * per
        const show = pop(f, at, 12)
        const leave = i < 3 ? ease(f, at + per, 12) : 0
        if (f < at - 1 || leave >= 1) return null
        const Icon = icons[b.icon]
        const ic = pop(f, at + 8 * k, 9)
        return (
          <div key={i} style={abs((STAGE_W - PHOTO.w) / 2, PHOTO.y, PHOTO.w, PHOTO.h, { opacity: 1 - leave, transform: `translateX(${leave * -120}px) rotate(${leave * -6}deg)` })}>
            <Blob w={PHOTO.w} h={PHOTO.h} seed={`b${i}`} src={b.photo} focus={b.focus} show={show} zoom={1.05 + (f - at) / 1400} border={14} />
            <div
              style={abs(PHOTO.w - 190, PHOTO.h - 170, 150, 150, {
                borderRadius: '50%',
                background: C.sun,
                border: `8px solid ${C.white}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${ic}) rotate(${(1 - ic) * -40}deg)`,
                boxShadow: '0 12px 24px rgba(15,32,40,0.3)',
              })}
            >
              <Icon size={76} color={C.navy} strokeWidth={2.2} />
            </div>
          </div>
        )
      })}

      {/* daftar manfaat */}
      <div style={abs(70, 770, 840, 480, { display: 'flex', flexDirection: 'column', gap: 16 })}>
        {content.benefits.map((b, i) => {
          const at = first + i * per
          const a = pop(f, at, 13)
          const reveal = clamp01((f - at - 4 * k) / (14 * k))
          const isActive = i === active
          const seen = f >= at
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '16px 24px 16px 14px',
                borderRadius: 26,
                background: isActive ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.72)',
                boxShadow: isActive ? '0 16px 34px rgba(15,32,40,0.28)' : '0 6px 14px rgba(15,32,40,0.12)',
                opacity: seen ? 1 : 0,
                transform: `translateX(${(1 - a) * -700}px) scale(${isActive ? 1.03 : 0.98})`,
                transformOrigin: 'left center',
              }}
            >
              <div style={{ flexShrink: 0, transform: `translateX(${(1 - a) * -60}px) scale(${isActive ? 1.15 : 1})` }}>
                <Arrow size={52} />
              </div>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontWeight: 800,
                  fontSize: 40,
                  lineHeight: 1.16,
                  letterSpacing: '0.01em',
                  color: isActive ? C.navy : '#2E4F5C',
                  clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
                }}
              >
                {b.text}
              </div>
            </div>
          )
        })}
      </div>
    </Stage>
  )
}
