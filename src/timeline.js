// @ts-check
/**
 * SUMBER KEBENARAN WAKTU (frame @30 fps) untuk animasi DAN audio.
 * Dipakai oleh komponen Remotion (src/) dan generator audio (scripts/audio.mjs),
 * sehingga efek suara selalu pas dengan animasi.
 *
 * Setiap adegan dirancang pada durasi "nominal" (versi 30 detik). Versi lain
 * memakai durasi berbeda: semua event di adegan itu diskalakan proporsional.
 */

export const FPS = 30

/** Durasi rancangan tiap adegan (frame) */
export const NOMINAL = { intro: 80, title: 130, suasana: 90, benefits: 350, cta: 150, end: 100 }

/** Event lokal tiap adegan (frame nominal, dihitung dari awal adegan) */
export const EV = {
  intro: { surface: 18, logo: 26, exit: 64 },
  title: { photos: 8, hydroStart: 8, hydroGap: 3, forPop: 48, needsStart: 56, needsGap: 2.5, swimIn: 22, swimOut: 124, snorkel: 52, exit: 116 },
  suasana: { b1: 2, b2: 12, b3: 18, caption: 28, exit: 76 },
  benefits: { banner: 0 },
  cta: { w1: 14, w2: 22, w3: 30, wa: 44, loc: 58, hours: 68 },
  end: { logo: 4, slogan: 18, links: 34, sink: 64, sinkLen: 26 },
}

/** Panjang tumpang-tindih gelombang penutup sebelum adegan CTA */
export const WAVE_LEAD = 18

/**
 * @typedef {'intro'|'title'|'suasana'|'benefits'|'cta'|'end'} SceneName
 * @typedef {{ name: SceneName, from: number, len: number }} Scene
 * @typedef {{ id: string, label: string, width: number, height: number, stageTop: number, duration: number,
 *   scenes: Scene[], benefits: { first: number, per: number } }} Variant
 */

/** @param {[SceneName, number, number][]} list @returns {Scene[]} */
const sc = (list) => list.map(([name, from, len]) => ({ name, from, len }))

/** @type {Record<string, Variant>} */
export const VARIANTS = {
  reel30: {
    id: 'reel30',
    label: 'Reels 30 detik (9:16)',
    width: 1080,
    height: 1920,
    stageTop: 240,
    duration: 900,
    scenes: sc([['intro', 0, 80], ['title', 80, 130], ['suasana', 210, 90], ['benefits', 300, 350], ['cta', 650, 150], ['end', 800, 100]]),
    benefits: { first: 30, per: 78 },
  },
  reel15: {
    id: 'reel15',
    label: 'Iklan 15 detik (9:16)',
    width: 1080,
    height: 1920,
    stageTop: 240,
    duration: 450,
    scenes: sc([['intro', 0, 44], ['title', 44, 76], ['benefits', 120, 200], ['cta', 320, 76], ['end', 396, 54]]),
    benefits: { first: 20, per: 45 },
  },
  feed30: {
    id: 'feed30',
    label: 'Feed 30 detik (4:5)',
    width: 1080,
    height: 1350,
    stageTop: 45,
    duration: 900,
    scenes: sc([['intro', 0, 80], ['title', 80, 130], ['suasana', 210, 90], ['benefits', 300, 350], ['cta', 650, 150], ['end', 800, 100]]),
    benefits: { first: 30, per: 78 },
  },
}

/** @param {Variant} v @param {SceneName} name */
export const scene = (v, name) => v.scenes.find((s) => s.name === name)

/** Skala waktu adegan (durasi sebenarnya / nominal) */
export const scaleOf = (/** @type {Scene} */ s) => s.len / NOMINAL[s.name]

/** Frame global ketika air "menutup" kembali di akhir (untuk loop mulus) */
export function sinkFrame(/** @type {Variant} */ v) {
  const e = /** @type {Scene} */ (scene(v, 'end'))
  return Math.round(e.from + EV.end.sink * scaleOf(e))
}
export function surfaceFrame(/** @type {Variant} */ v) {
  const s = /** @type {Scene} */ (scene(v, 'intro'))
  return Math.round(s.from + EV.intro.surface * scaleOf(s))
}

/**
 * Daftar isyarat efek suara (frame global).
 * @param {Variant} v
 * @returns {{ f: number, type: string, gain?: number, pitch?: number, len?: number }[]}
 */
export function cues(v) {
  /** @type {{ f: number, type: string, gain?: number, pitch?: number, len?: number }[]} */
  const out = []
  const at = (/** @type {Scene|undefined} */ s, /** @type {number} */ local) => (s ? Math.round(s.from + local * scaleOf(s)) : -1)
  const sink = sinkFrame(v)
  const lead = v.duration - sink

  // gelembung "lanjutan" dari akhir video (loop) + gelembung di akhir
  out.push({ f: -lead, type: 'burst' }, { f: sink, type: 'burst' })

  const intro = scene(v, 'intro')
  out.push({ f: at(intro, EV.intro.surface), type: 'splash' })
  out.push({ f: at(intro, EV.intro.logo), type: 'pop', gain: 1.2 })
  out.push({ f: at(intro, EV.intro.exit), type: 'whoosh', gain: 0.6 })

  const t = scene(v, 'title')
  if (t) {
    const k = scaleOf(t)
    out.push({ f: at(t, EV.title.photos), type: 'pop', gain: 0.7, pitch: 0.9 })
    'HYDROTHERAPY'.split('').forEach((_, i) => out.push({ f: at(t, EV.title.hydroStart + i * EV.title.hydroGap) + Math.round(9 * k), type: 'plop', gain: 0.55, pitch: 0.85 + i * 0.05 }))
    out.push({ f: at(t, EV.title.forPop), type: 'pop', gain: 1 })
    'SPECIALNEEDS'.split('').forEach((_, i) => out.push({ f: at(t, EV.title.needsStart + i * EV.title.needsGap) + Math.round(9 * k), type: 'plop', gain: 0.5, pitch: 1.1 + i * 0.045 }))
    out.push({ f: at(t, EV.title.snorkel), type: 'bubble', gain: 0.8 })
    for (let f = at(t, EV.title.swimIn); f < at(t, EV.title.swimOut); f += 10) out.push({ f, type: 'swim', gain: 0.6 })
    out.push({ f: at(t, EV.title.exit), type: 'whoosh', gain: 0.7 })
  }

  const s = scene(v, 'suasana')
  if (s) {
    out.push({ f: at(s, EV.suasana.b1), type: 'bubble', gain: 1 })
    out.push({ f: at(s, EV.suasana.b2), type: 'bubble', gain: 0.8, pitch: 1.2 })
    out.push({ f: at(s, EV.suasana.b3), type: 'bubble', gain: 0.8, pitch: 1.4 })
    out.push({ f: at(s, EV.suasana.caption), type: 'pop', gain: 0.9 })
    out.push({ f: at(s, EV.suasana.exit), type: 'whoosh', gain: 0.6 })
  }

  const b = scene(v, 'benefits')
  if (b) {
    out.push({ f: b.from, type: 'whoosh', gain: 0.9 })
    for (let i = 0; i < 4; i++) {
      const f = b.from + v.benefits.first + i * v.benefits.per
      out.push({ f, type: 'whoosh', gain: 0.45, len: 0.35 }, { f: f + 6, type: 'pop', gain: 1, pitch: 1 + i * 0.12 })
    }
  }

  const c = scene(v, 'cta')
  if (c) {
    out.push({ f: c.from - WAVE_LEAD, type: 'wave' })
    out.push({ f: at(c, EV.cta.w1), type: 'pop', gain: 0.8 }, { f: at(c, EV.cta.w2), type: 'pop', gain: 1, pitch: 1.2 }, { f: at(c, EV.cta.w3), type: 'pop', gain: 0.8, pitch: 1.35 })
    out.push({ f: at(c, EV.cta.wa), type: 'ding' })
    out.push({ f: at(c, EV.cta.loc), type: 'pop', gain: 0.8, pitch: 0.9 })
  }

  const e = scene(v, 'end')
  if (e) {
    out.push({ f: at(e, EV.end.logo), type: 'pop', gain: 1.1 })
    out.push({ f: at(e, EV.end.slogan), type: 'sparkle' })
    out.push({ f: at(e, EV.end.links), type: 'pop', gain: 0.7, pitch: 1.2 })
    out.push({ f: sink - 2, type: 'whoosh', gain: 0.5, len: 0.7 })
  }
  return out.filter((x) => x.f > -v.duration)
}
