import { Player, type PlayerRef } from '@remotion/player'
import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Main, type AudioMode, type VariantId } from '../src/Main'
import { FPS, VARIANTS } from '../src/timeline.js'

/**
 * Halaman preview LIVE untuk HP.
 * Setiap kali kode di src/ diubah, halaman ini otomatis memuat ulang (hot reload).
 */
const audioLabels: Record<AudioMode, string> = { mix: 'Musik + efek', sfx: 'Efek saja', none: 'Tanpa suara' }

interface Render { name: string; size: number }

function App() {
  const [variant, setVariant] = useState<VariantId>('reel30')
  const [audio, setAudio] = useState<AudioMode>('mix')
  const [renders, setRenders] = useState<Render[]>([])
  const ref = useRef<PlayerRef>(null)
  const v = VARIANTS[variant]

  useEffect(() => {
    fetch('/renders/index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then(setRenders)
      .catch(() => setRenders([]))
  }, [])

  const btn = (active: boolean) => ({
    flex: 1,
    minHeight: 44,
    border: 0,
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 13.5,
    padding: '8px 6px',
    background: active ? '#2EC4D6' : 'rgba(255,255,255,0.08)',
    color: active ? '#0F2028' : '#fff',
  })

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '14px 14px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Preview Motion Graphic</div>
          <div style={{ fontSize: 12.5, opacity: 0.7 }}>Hydro Neuroforge Center · live</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: 'rgba(37,211,102,0.15)', color: '#25D366' }}>● LIVE</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        {(Object.keys(VARIANTS) as VariantId[]).map((id) => (
          <button key={id} type="button" style={btn(id === variant)} onClick={() => setVariant(id)}>
            {VARIANTS[id].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(Object.keys(audioLabels) as AudioMode[]).map((a) => (
          <button key={a} type="button" style={btn(a === audio)} onClick={() => setAudio(a)}>
            {audioLabels[a]}
          </button>
        ))}
      </div>

      <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7)', background: '#000' }}>
        <Player
          key={variant + audio}
          ref={ref}
          component={Main}
          inputProps={{ variant, audio }}
          durationInFrames={v.duration}
          fps={FPS}
          compositionWidth={v.width}
          compositionHeight={v.height}
          style={{ width: '100%', aspectRatio: `${v.width} / ${v.height}` }}
          controls
          loop
          clickToPlay
          doubleClickToFullscreen
          allowFullscreen
          acknowledgeRemotionLicense
        />
      </div>
      <p style={{ fontSize: 12.5, opacity: 0.7, lineHeight: 1.5 }}>
        Ketuk video untuk memutar. Suara baru aktif setelah diketuk (aturan browser HP). Ketuk dua kali untuk layar penuh.
      </p>

      {renders.length > 0 && (
        <div style={{ marginTop: 18, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Unduh video final (MP4)</div>
          {renders.map((r) => (
            <a
              key={r.name}
              href={`/renders/${r.name}`}
              download
              style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 4px', color: '#A9ECF3', fontSize: 14, borderTop: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
            >
              <span>⬇ {r.name}</span>
              <span style={{ opacity: 0.6 }}>{(r.size / 1048576).toFixed(1)} MB</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
