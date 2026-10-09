export type Tier = 'high' | 'mid' | 'low'

/**
 * Perkiraan kemampuan perangkat untuk 3D.
 * - low  : tanpa WebGL / perangkat sangat terbatas → latar statis
 * - mid  : kebanyakan HP → resolusi & partikel dikurangi
 * - high : desktop / HP kelas atas → semua efek
 */
export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'low'
  // untuk pengujian: ?tier=high | mid | low
  const forced = new URLSearchParams(location.search).get('tier')
  if (forced === 'high' || forced === 'mid' || forced === 'low') return forced
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'low'
  let gl: WebGLRenderingContext | null = null
  try {
    const c = document.createElement('canvas')
    gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null
  } catch {
    return 'low'
  }
  if (!gl) return 'low'
  const mem = nav.deviceMemory ?? 4
  const cores = nav.hardwareConcurrency ?? 4
  let renderer = ''
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : ''
  } catch {
    /* abaikan */
  }
  gl.getExtension('WEBGL_lose_context')?.loseContext()
  if (/swiftshader|llvmpipe|software/i.test(renderer)) return 'low'
  if (mem <= 2 || cores <= 2) return 'low'
  const mobile = matchMedia('(pointer: coarse)').matches || innerWidth < 768
  if (mobile) return mem >= 8 && /apple|adreno \(tm\) (7|8)\d\d|mali-g7[1-9]|mali-g[6-9]\d\d|immortalis/i.test(renderer) ? 'high' : 'mid'
  return 'high'
}
