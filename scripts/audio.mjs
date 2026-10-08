// Membuat audio ORISINAL (musik + efek suara) yang tersinkron dengan animasi.
// Semua suara disintesis dari nol, sehingga bebas hak cipta dan aman untuk iklan.
// Jalankan: node scripts/audio.mjs   → public/audio/<versi>-mix.wav & <versi>-sfx.wav
import { writeFileSync, mkdirSync } from 'node:fs'
import { FPS, VARIANTS, cues } from '../src/timeline.js'

const SR = 48000
const TAU = Math.PI * 2

/* ---------------- util ---------------- */
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const R = rng(20261008)
const noise = (n, r = R) => Float32Array.from({ length: n }, () => r() * 2 - 1)
const secs = (s) => Math.max(1, Math.round(s * SR))

/** State-variable filter (Chamberlin). fc boleh angka atau fungsi(i). mode: low|band|high */
function svf(x, fc, q = 0.7, mode = 'low') {
  const y = new Float32Array(x.length)
  let low = 0, band = 0
  for (let i = 0; i < x.length; i++) {
    const c = typeof fc === 'function' ? fc(i) : fc
    const f = 2 * Math.sin((Math.PI * Math.min(c, SR / 6.5)) / SR)
    low += f * band
    const high = x[i] - low - q * band
    band += f * high
    y[i] = mode === 'low' ? low : mode === 'band' ? band : high
  }
  return y
}

class Bus {
  constructor(n, wrap = false) {
    this.L = new Float32Array(n)
    this.R = new Float32Array(n)
    this.n = n
    this.wrap = wrap
  }
  /** tambahkan sinyal mono di detik `t` dengan gain & pan (-1..1) */
  add(sig, t, gain = 1, pan = 0) {
    const s0 = Math.round(t * SR)
    const gl = Math.cos(((pan + 1) * Math.PI) / 4) * gain
    const gr = Math.sin(((pan + 1) * Math.PI) / 4) * gain
    for (let i = 0; i < sig.length; i++) {
      let k = s0 + i
      if (this.wrap) k = ((k % this.n) + this.n) % this.n
      else if (k < 0 || k >= this.n) continue
      this.L[k] += sig[i] * gl
      this.R[k] += sig[i] * gr
    }
  }
  addStereo(l, r, t, gain = 1) {
    const s0 = Math.round(t * SR)
    for (let i = 0; i < l.length; i++) {
      const k = s0 + i
      if (k < 0 || k >= this.n) continue
      this.L[k] += l[i] * gain
      this.R[k] += r[i] * gain
    }
  }
}

/* ---------------- instrumen musik ---------------- */
function marimba(f, dur = 0.9) {
  const n = secs(dur), y = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / SR
    const a = Math.min(1, t / 0.002)
    y[i] = a * (Math.sin(TAU * f * t) * Math.exp(-t / 0.42) + 0.33 * Math.sin(TAU * 3.99 * f * t) * Math.exp(-t / 0.11) + 0.09 * Math.sin(TAU * 9.93 * f * t) * Math.exp(-t / 0.035))
  }
  return y
}
function bell(f, dur = 1.2, d = 0.5) {
  const n = secs(dur), y = new Float32Array(n)
  const P = [[1, 1, 1], [2.0, 0.45, 0.7], [2.76, 0.35, 0.5], [5.4, 0.16, 0.25]]
  for (let i = 0; i < n; i++) {
    const t = i / SR
    let s = 0
    for (const [m, a, k] of P) s += a * Math.sin(TAU * f * m * t) * Math.exp(-t / (d * k))
    y[i] = s * Math.min(1, t / 0.0015)
  }
  return y
}
function pad(freqs, dur) {
  const n = secs(dur + 0.6), y = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / SR
    const env = Math.min(1, t / 0.35) * (t > dur ? Math.exp(-(t - dur) / 0.25) : 1)
    let s = 0
    for (const f of freqs) {
      s += Math.sin(TAU * f * t) + Math.sin(TAU * f * 1.003 * t + 1) * 0.8 + Math.sin(TAU * f * 0.997 * t + 2) * 0.8 + 0.25 * Math.sin(TAU * 2 * f * t)
    }
    y[i] = (s / freqs.length) * env * (0.85 + 0.15 * Math.sin(TAU * 0.5 * t))
  }
  return y
}
function bass(f, dur = 0.5) {
  const n = secs(dur), y = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / SR
    const s = Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * 2 * f * t)
    y[i] = Math.tanh(1.4 * s) * Math.min(1, t / 0.006) * Math.exp(-t / 0.32)
  }
  return y
}
function kick() {
  const n = secs(0.35), y = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    ph += (TAU * (48 + 75 * Math.exp(-t / 0.03))) / SR
    y[i] = Math.sin(ph) * Math.exp(-t / 0.16)
  }
  return y
}
function snap() {
  const nz = svf(noise(secs(0.2)), 1900, 0.6, 'band')
  for (let i = 0; i < nz.length; i++) {
    const t = i / SR
    const bursts = Math.exp(-t / 0.004) + 0.7 * (t > 0.009 ? Math.exp(-(t - 0.009) / 0.004) : 0) + (t > 0.018 ? Math.exp(-(t - 0.018) / 0.06) : 0)
    nz[i] *= bursts * 1.6
  }
  return nz
}
function shaker() {
  const nz = svf(noise(secs(0.08)), 7000, 0.8, 'high')
  for (let i = 0; i < nz.length; i++) {
    const t = i / SR
    nz[i] *= Math.min(1, t / 0.004) * Math.exp(-t / 0.022)
  }
  return nz
}

const N = { A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, F3: 174.61, G3: 196, B3: 246.94, G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568, A6: 1760, C7: 2093, E7: 2637 }
const CHORDS = [
  { pad: [N.C4, N.E4, N.G4], bass: 65.41, top: N.C6 },
  { pad: [N.G3, N.B3, N.D4], bass: 98.0, top: 1174.7 },
  { pad: [N.A3, N.C4, N.E4], bass: 110.0, top: N.A5 },
  { pad: [N.F3, N.A3, N.C4], bass: 87.31, top: N.A5 },
]
const PHRASE_A = [
  ['E5', 0, 'G5', 0, 'A5', 'G5', 'E5', 0],
  ['D5', 0, 'G5', 0, 'D5', 0, 'E5', 'D5'],
  ['C5', 0, 'E5', 0, 'A5', 0, 'G5', 'E5'],
  ['C5', 0, 'A4', 0, 'C5', 'D5', 0, 0],
]
const PHRASE_B = [
  ['G5', 0, 'E5', 'G5', 0, 'C6', 0, 'A5'],
  ['G5', 0, 'D5', 0, 'G5', 0, 'A5', 'G5'],
  ['E5', 0, 'A5', 0, 'C6', 0, 'A5', 'E5'],
  ['A5', 0, 'G5', 0, 'E5', 0, 'D5', 0],
]

function music(durSec) {
  const BPM = 128
  const beat = 60 / BPM, bar = beat * 4
  const bars = Math.round(durSec / bar)
  const bus = new Bus(secs(durSec), true) // wrap = loop mulus
  for (let b = 0; b < bars; b++) {
    const t0 = b * bar
    const ch = CHORDS[b % 4]
    const phrase = Math.floor(b / 4) % 2 === 0 ? PHRASE_A : PHRASE_B
    const full = b >= 1 && b < bars - 1
    const drums = b >= 1 && b !== bars - 1
    bus.add(pad(ch.pad, bar), t0, b === 0 ? 0.05 : 0.065)
    bus.add(bass(ch.bass, beat * 1.4), t0, 0.2)
    bus.add(bass(ch.bass, beat * 0.9), t0 + beat * 1.5, 0.14)
    bus.add(bass(ch.bass * (b % 2 ? 1.5 : 1), beat * 0.9), t0 + beat * 2.5, 0.15)
    phrase[b % 4].forEach((nm, k) => {
      if (!nm) return
      bus.add(marimba(N[nm]), t0 + k * (beat / 2), 0.17, k % 2 ? 0.25 : -0.2)
    })
    if (full && b % 2 === 0) bus.add(bell(ch.top, 1.6, 0.6), t0, 0.035, 0.4)
    for (let k = 0; k < 8; k++) bus.add(shaker(), t0 + k * (beat / 2), k % 2 ? 0.05 : 0.028, 0.35)
    if (drums) {
      bus.add(kick(), t0, 0.36)
      bus.add(kick(), t0 + beat * 2, 0.3)
      if (b >= 2) {
        bus.add(snap(), t0 + beat, 0.09, -0.15)
        bus.add(snap(), t0 + beat * 3, 0.09, -0.15)
      }
    }
  }
  return bus
}

/* ---------------- efek suara ---------------- */
function bubbleSig(pitch = 1, r = R) {
  const f0 = 520 * pitch * (0.8 + r() * 0.5)
  const n = secs(0.09), y = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    ph += (TAU * f0 * (1 + 2.6 * Math.min(t, 0.06) / 0.06)) / SR
    y[i] = Math.sin(ph) * Math.sin((Math.PI / 2) * Math.min(1, t / 0.006)) * Math.exp(-t / 0.032)
  }
  return y
}
function plopSig(pitch = 1) {
  const n = secs(0.16), y = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    ph += (TAU * 190 * pitch * (1 + 3 * Math.min(t, 0.07) / 0.07)) / SR
    y[i] = Math.sin(ph) * Math.min(1, t / 0.002) * Math.exp(-t / 0.05)
  }
  return y
}
function popSig(pitch = 1) {
  const n = secs(0.12), y = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    ph += (TAU * 760 * pitch * (1 + 1.2 * Math.exp(-t / 0.006))) / SR
    y[i] = (Math.sin(ph) + 0.3 * Math.sin(2 * ph)) * Math.min(1, t / 0.001) * Math.exp(-t / 0.028)
  }
  return y
}
function whooshSig(len = 0.6) {
  const n = secs(len)
  const fc = (i) => {
    const p = i / n
    return 350 + 2600 * Math.sin(Math.PI * p) ** 1.5
  }
  const y = svf(noise(n), fc, 0.55, 'band')
  for (let i = 0; i < n; i++) y[i] *= Math.sin((Math.PI * i) / n) ** 1.6 * 1.4
  return y
}
function splashSig() {
  const n = secs(0.7)
  const lo = svf(noise(n), 3200, 0.7, 'low')
  const hi = svf(noise(n), 6000, 0.8, 'high')
  const y = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / SR
    y[i] = (lo[i] * Math.exp(-t / 0.17) + 0.5 * hi[i] * Math.exp(-t / 0.07)) * Math.min(1, t / 0.004)
  }
  return y
}
function swimSig() {
  const n = secs(0.18)
  const y = svf(noise(n), 1400, 0.8, 'band')
  for (let i = 0; i < n; i++) y[i] *= Math.exp(-(i / SR) / 0.045) * 1.6
  return y
}
function waveStereo(len = 1.7) {
  const n = secs(len)
  const fc = (i) => {
    const t = i / SR
    return t < 0.75 ? 200 + 3200 * (t / 0.75) ** 1.6 : 3400 - 2500 * Math.min(1, (t - 0.75) / 0.9)
  }
  const env = (t) => (t < 0.7 ? (t / 0.7) ** 2 : Math.exp(-(t - 0.7) / 0.38))
  const mk = (seed) => {
    const r = rng(seed)
    const lo = svf(noise(n, r), fc, 0.6, 'low')
    const hi = svf(noise(n, r), 5500, 0.8, 'high')
    return lo.map((v, i) => {
      const t = i / SR
      return v * env(t) * 1.3 + hi[i] * (t > 0.6 ? Math.exp(-(t - 0.6) / 0.5) : (t / 0.6) ** 3) * 0.35
    })
  }
  return [mk(11), mk(22)]
}

function sfx(v) {
  const dur = v.duration / FPS
  const bus = new Bus(secs(dur), false)
  for (const c of cues(v)) {
    const t = c.f / FPS
    const g = c.gain ?? 1
    const p = c.pitch ?? 1
    switch (c.type) {
      case 'burst': {
        const r = rng(Math.abs(c.f) + 7)
        for (let k = 0; k < 36; k++) bus.add(bubbleSig(0.7 + r() * 1.4, r), t + r() * 1.0, (0.18 + r() * 0.3) * g, r() * 1.6 - 0.8)
        const rum = svf(noise(secs(1.1), r), 420, 0.7, 'low').map((x, i) => x * Math.min(1, i / SR / 0.15) * Math.exp(-(i / SR) / 0.45))
        bus.add(rum, t, 0.5 * g)
        break
      }
      case 'splash': {
        bus.add(splashSig(), t, 0.55 * g)
        const r = rng(c.f + 3)
        for (let k = 0; k < 10; k++) bus.add(bubbleSig(1 + r(), r), t + 0.06 + r() * 0.5, 0.2, r() * 1.2 - 0.6)
        break
      }
      case 'plop':
        bus.add(plopSig(p), t, 0.42 * g, (p - 1.3) * 0.8)
        break
      case 'pop':
        bus.add(popSig(p), t, 0.42 * g)
        break
      case 'bubble': {
        const r = rng(c.f + 5)
        for (let k = 0; k < 4; k++) bus.add(bubbleSig(p * (0.9 + k * 0.25), r), t + k * 0.05, 0.32 * g, r() - 0.5)
        break
      }
      case 'whoosh':
        bus.add(whooshSig(c.len ?? 0.6), t - (c.len ?? 0.6) * 0.35, 0.3 * g, 0)
        break
      case 'swim':
        bus.add(swimSig(), t, 0.16 * g, ((c.f % 40) / 40) * 1.4 - 0.7)
        break
      case 'wave': {
        const [l, r] = waveStereo()
        bus.addStereo(l, r, t - 0.2, 0.55 * g)
        break
      }
      case 'ding':
        bus.add(bell(N.E6, 1.4, 0.55), t, 0.2 * g, -0.1)
        bus.add(bell(N.G6 * 1.335, 1.4, 0.55), t + 0.11, 0.16 * g, 0.1)
        break
      case 'sparkle':
        ;[N.C6, N.E6, N.G6, N.A6, N.C7, N.E7].forEach((f, k) => bus.add(bell(f, 0.9, 0.3), t + k * 0.055, 0.11 * g, k % 2 ? 0.4 : -0.4))
        break
    }
  }
  return bus
}

/* ---------------- master & WAV ---------------- */
function master(L, R, target = 0.89) {
  const lim = (x) => Math.tanh(1.15 * x) / Math.tanh(1.15)
  let peak = 0
  const l = L.map((x) => lim(x)), r = R.map((x) => lim(x))
  for (let i = 0; i < l.length; i++) peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i]))
  const k = peak > 0 ? target / peak : 1
  return [l.map((x) => x * k), r.map((x) => x * k)]
}
function writeWav(path, L, R) {
  const n = L.length
  const buf = Buffer.alloc(44 + n * 4)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8)
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22)
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34)
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40)
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4)
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4)
  }
  writeFileSync(path, buf)
}
const stats = (L) => {
  let pk = 0, ss = 0
  for (const x of L) { pk = Math.max(pk, Math.abs(x)); ss += x * x }
  return `peak ${(20 * Math.log10(pk)).toFixed(1)} dBFS, rms ${(20 * Math.log10(Math.sqrt(ss / L.length))).toFixed(1)} dBFS`
}

mkdirSync('public/audio', { recursive: true })
const musicCache = {}
for (const v of Object.values(VARIANTS)) {
  const dur = v.duration / FPS
  const m = (musicCache[dur] ??= music(dur))
  const s = sfx(v)
  const mixL = m.L.map((x, i) => x * 0.6 + s.L[i] * 0.95)
  const mixR = m.R.map((x, i) => x * 0.6 + s.R[i] * 0.95)
  const [ml, mr] = master(mixL, mixR)
  writeWav(`public/audio/${v.id}-mix.wav`, ml, mr)
  const [sl, sr] = master(s.L, s.R, 0.85)
  writeWav(`public/audio/${v.id}-sfx.wav`, sl, sr)
  console.log(v.id, `${dur}s`, 'mix:', stats(ml), '| sfx:', stats(sl))
}
