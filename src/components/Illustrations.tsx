import { useCurrentFrame } from 'remotion'
import { C } from '../theme'

/** Ilustrasi anak berenang (digambar ulang, gaya kartun sederhana). */
export function Swimmer({ size = 320 }: { size?: number }) {
  const f = useCurrentFrame()
  const arm = (f * 13) % 360
  const kick = Math.sin(f / 2.2) * 6
  const bob = Math.sin(f / 6) * 3
  return (
    <svg width={size} height={size * 0.56} viewBox="0 0 320 180" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="swimWater" x1="0" x2="1">
          <stop offset="0" stopColor="#7FD3EA" stopOpacity="0" />
          <stop offset="0.25" stopColor="#7FD3EA" stopOpacity="0.95" />
          <stop offset="0.8" stopColor="#7FD3EA" stopOpacity="0.95" />
          <stop offset="1" stopColor="#7FD3EA" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="swimFoam" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#fff" />
          <stop offset="0.75" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={`translate(0 ${bob})`}>
        {/* kaki menendang */}
        <ellipse cx={42} cy={118 + kick} rx={26} ry={10} fill={C.skin} />
        <ellipse cx={30} cy={128 - kick} rx={22} ry={9} fill={C.skin} />
        {/* badan (baju renang) */}
        <rect x={60} y={98} width={140} height={44} rx={22} fill="#3B7BD8" />
        {/* lengan berputar (gaya bebas) */}
        <g transform={`rotate(${arm} 205 104)`}>
          <rect x={200} y={98} width={86} height={22} rx={11} fill={C.skin} />
          <circle cx={286} cy={109} r={14} fill={C.skin} />
        </g>
        {/* kepala */}
        <circle cx={225} cy={86} r={42} fill={C.skin} />
        {/* topi renang */}
        <path d="M184 82 a42 42 0 0 1 83 -6 q-40 -6 -83 6z" fill={C.orange} />
        <path d="M186 74 a42 42 0 0 1 80 -10" stroke="#FFB37A" strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* kacamata */}
        <rect x={204} y={84} width={60} height={8} rx={4} fill="#1E5AA8" />
        <circle cx={226} cy={92} r={13} fill="#BFE9FF" stroke="#1E5AA8" strokeWidth={5} />
        <circle cx={254} cy={92} r={13} fill="#BFE9FF" stroke="#1E5AA8" strokeWidth={5} />
        <circle cx={222} cy={88} r={3.5} fill="#fff" />
        <circle cx={250} cy={88} r={3.5} fill="#fff" />
        {/* senyum */}
        <path d="M232 112 q12 10 24 0" stroke="#B5552B" strokeWidth={4} fill="none" strokeLinecap="round" />
        <circle cx={262} cy={106} r={5} fill="#FF9C9C" opacity={0.7} />
      </g>
      {/* air menutupi bagian bawah */}
      <path
        d={`M0 ${132 + Math.sin(f / 4) * 3} q40 -14 80 0 t80 0 t80 0 t80 0 V180 H0z`}
        fill="url(#swimWater)"
      />
      <path d={`M-10 ${136 + Math.sin(f / 4 + 1) * 3} q40 -12 80 0 t80 0 t80 0 t80 0`} stroke="url(#swimFoam)" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* cipratan */}
      {[0, 1, 2].map((i) => {
        const p = ((f + i * 7) % 21) / 21
        return <circle key={i} cx={20 + i * 14 - p * 30} cy={110 - Math.sin(p * Math.PI) * 40} r={6 - p * 4} fill="#fff" opacity={1 - p} />
      })}
    </svg>
  )
}

/** Masker snorkel mengapung. */
export function Snorkel({ size = 200 }: { size?: number }) {
  const f = useCurrentFrame()
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible', transform: `rotate(${Math.sin(f / 9) * 9}deg) translateY(${Math.sin(f / 7) * 8}px)` }}>
      {/* pipa */}
      <path d="M40 30 v120 q0 30 30 30 h20" stroke="#1E5AA8" strokeWidth={18} fill="none" strokeLinecap="round" />
      <rect x={28} y={14} width={24} height={28} rx={8} fill="#FFD447" />
      {/* tali */}
      <path d="M58 96 q60 -60 130 0" stroke="#1E5AA8" strokeWidth={10} fill="none" />
      {/* masker */}
      <rect x={70} y={80} width={124} height={74} rx={30} fill="#2E86DE" />
      <rect x={82} y={90} width={100} height={54} rx={22} fill="#BFE9FF" />
      <path d="M96 100 q14 -6 24 4" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Panah kuning ala poster. */
export const Arrow = ({ size = 46 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 46 46">
    <path d="M6 4 L40 23 L6 42 L16 23 Z" fill={C.sun} stroke="#F2A900" strokeWidth={2} strokeLinejoin="round" />
  </svg>
)

/** Ikon pin lokasi */
export const Pin = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" fill="#E8454F" />
    <circle cx={12} cy={9} r={2.8} fill="#fff" />
  </svg>
)

export const WaIcon = ({ size = 56, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.04c0 2 .52 3.95 1.52 5.67L.6 23.3l5.74-1.5a11.3 11.3 0 0 0 5.7 1.45h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
)

export const IgIcon = ({ size = 44, color = C.navy }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2}>
    <rect x={3} y={3} width={18} height={18} rx={5} />
    <circle cx={12} cy={12} r={4} />
    <circle cx={17.5} cy={6.5} r={1.1} fill={color} stroke="none" />
  </svg>
)

export const GlobeIcon = ({ size = 44, color = C.navy }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <circle cx={12} cy={12} r={9} />
    <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
  </svg>
)
