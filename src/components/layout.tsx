import { createContext, useContext, type CSSProperties, type ReactNode } from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { NOMINAL } from '../timeline.js'

/**
 * Semua adegan digambar di "panggung" 1080×1260.
 * - 9:16 → panggung mulai y=240 (aman dari UI Reels/TikTok atas & bawah)
 * - 4:5  → panggung mulai y=45
 */
export const STAGE_W = 1080
export const STAGE_H = 1260

const Ctx = createContext({ stageTop: 240 })
export const LayoutProvider = ({ stageTop, children }: { stageTop: number; children: ReactNode }) => <Ctx.Provider value={{ stageTop }}>{children}</Ctx.Provider>
export const useLayout = () => useContext(Ctx)

export function Stage({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const { stageTop } = useLayout()
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, top: stageTop, width: STAGE_W, height: STAGE_H, ...style }}>{children}</div>
    </AbsoluteFill>
  )
}

/** Frame lokal yang sudah diskalakan ke durasi nominal adegan (versi 15 dtk = lebih cepat). */
export function useSceneFrame(name: keyof typeof NOMINAL, len: number) {
  const frame = useCurrentFrame()
  const k = len / NOMINAL[name]
  return { f: frame / k, k, raw: frame }
}

/** Posisi absolut di panggung */
export const abs = (x: number, y: number, w?: number, h?: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h, ...extra })
