import { lazy, Suspense, useEffect, useState } from 'react'
import { useCalm } from '../lib/calm'
import { detectTier, type Tier } from '../lib/device'

const DiveScene = lazy(() => import('./DiveScene'))

/**
 * Latar laut penuh layar untuk beranda.
 * Selalu ada latar CSS (cepat tampil). Scene 3D dimuat setelah halaman siap
 * dan hanya di perangkat yang mampu, serta tidak dalam Mode Tenang.
 */
export function OceanBackground() {
  const calm = useCalm()
  const [tier, setTier] = useState<Tier | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // kedalaman untuk latar CSS
    const root = document.documentElement
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, root.scrollHeight - innerHeight)
        const p = scrollY / max
        const depth = Math.min(1, p < 0.6 ? p / 0.6 : 1 - (p - 0.6) * 0.8)
        root.style.setProperty('--depth', depth.toFixed(3))
      })
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const start = () => setTier(detectTier())
    if (document.readyState === 'complete') setTimeout(start, 50)
    else addEventListener('load', () => setTimeout(start, 50), { once: true })
  }, [])

  const use3D = !calm && tier !== null && tier !== 'low'
  useEffect(() => {
    if (!use3D) setReady(false)
  }, [use3D])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="ocean-fallback" />
      {/* simbol logo melayang (terlihat bila 3D tidak aktif / belum siap) */}
      <img
        src="/img/logo-mark-light-256.webp"
        alt=""
        width={256}
        height={198}
        className="absolute top-[13svh] left-1/2 w-52 -translate-x-1/2 animate-float drop-shadow-[0_10px_40px_rgb(169_236_243/0.5)] md:top-[24vh] md:right-[10%] md:left-auto md:w-80 md:translate-x-0"
        style={{ opacity: 'calc(0.95 - var(--depth, 0) * 6)' }}
      />
      {use3D && (
        <div className={`absolute inset-0 transition-opacity duration-[1200ms] ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={null}>
            <DiveScene tier={tier} onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
