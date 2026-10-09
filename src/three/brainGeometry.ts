import { BufferAttribute, BufferGeometry } from 'three'

/** Generator acak deterministik agar bentuk otak selalu sama. */
function rng(seed = 7) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Membuat awan titik berbentuk otak (2 belahan + otak kecil) beserta garis koneksi saraf.
 * Setiap titik juga punya posisi "tersebar" agar bisa dianimasikan berkumpul (ditempa).
 */
export function createBrain(count: number) {
  const rand = rng(11)
  const pos = new Float32Array(count * 3)
  const scatter = new Float32Array(count * 3)
  const seeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number
    // arah acak seragam
    const u = rand() * 2 - 1
    const th = rand() * Math.PI * 2
    const r0 = Math.sqrt(1 - u * u)
    let dx = r0 * Math.cos(th)
    const dy = u
    const dz = r0 * Math.sin(th)
    const inner = rand() < 0.16
    const isCerebellum = !inner && rand() < 0.12
    if (isCerebellum) {
      const k = 1 + 0.05 * Math.sin(dx * 30) * Math.sin(dy * 28)
      x = dx * 0.62 * k
      y = -0.5 + dy * 0.26 * k
      z = -0.72 + dz * 0.36 * k
    } else {
      // lipatan girus
      const fold = 1 + 0.075 * Math.sin(dx * 13 + dz * 4) * Math.sin(dy * 12 - dz * 3) * Math.sin(dz * 11 + dx * 5)
      const s = (inner ? 0.25 + rand() * 0.65 : 1) * fold
      if (Math.abs(dx) < 0.07) dx = Math.sign(dx || 1) * (0.07 + Math.abs(dx) * 0.3) // celah tengah
      x = dx * 0.98 * s + Math.sign(dx) * 0.04
      y = dy * 0.8 * s
      z = dz * 1.18 * s
      if (y < -0.32) y = -0.32 + (y + 0.32) * 0.45 // dasar lebih datar
      y += 0.12 * (z / 1.18) // sedikit miring ke depan
    }
    pos.set([x, y, z], i * 3)
    // posisi tersebar: bola besar
    const R = 3 + rand() * 5
    const a = rand() * Math.PI * 2
    const b = Math.acos(rand() * 2 - 1)
    scatter.set([R * Math.sin(b) * Math.cos(a), R * Math.cos(b), R * Math.sin(b) * Math.sin(a)], i * 3)
    seeds[i] = rand()
  }

  const points = new BufferGeometry()
  points.setAttribute('position', new BufferAttribute(pos, 3))
  points.setAttribute('aScatter', new BufferAttribute(scatter, 3))
  points.setAttribute('aSeed', new BufferAttribute(seeds, 1))

  // Koneksi: tetangga terdekat via grid spasial
  const maxDist = 0.2
  const cell = maxDist
  const grid = new Map<string, number[]>()
  const key = (x: number, y: number, z: number) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`
  for (let i = 0; i < count; i++) {
    const k = key(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
    const arr = grid.get(k)
    if (arr) arr.push(i)
    else grid.set(k, [i])
  }
  const lines: number[] = []
  const maxLines = Math.round(count * 1.1)
  for (let i = 0; i < count && lines.length / 2 < maxLines; i++) {
    const px = pos[i * 3], py = pos[i * 3 + 1], pz = pos[i * 3 + 2]
    const cx = Math.floor(px / cell), cy = Math.floor(py / cell), cz = Math.floor(pz / cell)
    let made = 0
    for (let ox = -1; ox <= 1 && made < 2; ox++)
      for (let oy = -1; oy <= 1 && made < 2; oy++)
        for (let oz = -1; oz <= 1 && made < 2; oz++) {
          const arr = grid.get(`${cx + ox},${cy + oy},${cz + oz}`)
          if (!arr) continue
          for (const j of arr) {
            if (j <= i) continue
            const d = Math.hypot(pos[j * 3] - px, pos[j * 3 + 1] - py, pos[j * 3 + 2] - pz)
            if (d < maxDist && d > 0.05 && rand() < 0.5) {
              lines.push(i, j)
              if (++made >= 2) break
            }
          }
        }
  }
  const n = lines.length
  const lPos = new Float32Array(n * 3)
  const lScatter = new Float32Array(n * 3)
  const lSeed = new Float32Array(n)
  lines.forEach((idx, k) => {
    lPos.set(pos.subarray(idx * 3, idx * 3 + 3), k * 3)
    lScatter.set(scatter.subarray(idx * 3, idx * 3 + 3), k * 3)
    lSeed[k] = seeds[idx]
  })
  const segs = new BufferGeometry()
  segs.setAttribute('position', new BufferAttribute(lPos, 3))
  segs.setAttribute('aScatter', new BufferAttribute(lScatter, 3))
  segs.setAttribute('aSeed', new BufferAttribute(lSeed, 1))

  return { points, segs }
}
