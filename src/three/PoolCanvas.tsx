import { useEffect, useRef } from 'react'
import { useCalm } from '../lib/calm'
import { causticsGLSL } from './glsl'

/**
 * Permukaan kolam versi ringan (WebGL murni, ±3 KB) untuk landing page & 404.
 * Bereaksi terhadap sentuhan. Tidak memuat Three.js agar halaman iklan tetap kilat.
 */
const frag = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec3 uRip[4];
${causticsGLSL}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y) * 3.2;
  p.y += uTime * 0.05;
  vec2 off = vec2(0.0); float ring = 0.0;
  for (int i = 0; i < 4; i++){
    vec3 r = uRip[i]; float age = uTime - r.z;
    if (age > 0.0 && age < 3.0){
      vec2 rp = (r.xy - 0.5 * uRes) / min(uRes.x, uRes.y) * 3.2; rp.y += uTime * 0.05;
      vec2 d = p - rp; float dist = length(d); float front = age * 1.4;
      float w = sin((dist - front) * 12.0) * exp(-abs(dist - front) * 4.0) * exp(-age * 1.1);
      off += d / (dist + 0.001) * w * 0.18; ring += max(w, 0.0);
    }
  }
  float c = hnc_caustics(p + off, uTime * 0.7);
  vec3 deep = vec3(0.04, 0.55, 0.65), shallow = vec3(0.33, 0.86, 0.9);
  vec3 col = mix(deep, shallow, 0.45 + 0.35 * sin(p.x * 0.7 + 1.0) * sin(p.y * 0.6));
  col += vec3(0.8, 1.0, 1.0) * c * 0.33;
  float sp = hnc_caustics(p * 2.6 + off * 2.0, uTime * 1.5 + 3.0);
  col += pow(max(sp - 1.05, 0.0), 2.0) * 1.2 + ring * 0.25;
  col = mix(col, vec3(0.06, 0.13, 0.16), smoothstep(0.55, 0.0, uv.y) * 0.55);
  gl_FragColor = vec4(col, 1.0);
}`

export function PoolCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const calm = useCalm()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRip = gl.getUniformLocation(prog, 'uRip')
    const rip = new Float32Array(12).fill(-99)
    let ri = 0
    const dpr = Math.min(devicePixelRatio, 1.25)
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * dpr))
      canvas.height = Math.max(1, Math.round(r.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const t0 = performance.now()
    const now = () => (performance.now() - t0) / 1000
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      if (e.clientY > r.bottom) return
      rip.set([(e.clientX - r.left) * dpr, (r.bottom - e.clientY) * dpr, now()], (ri++ % 4) * 3)
    }
    addEventListener('pointerdown', onDown, { passive: true })

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !calm) loop()
    })
    io.observe(canvas)
    const draw = (t: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform3fv(uRip, rip)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = () => {
      cancelAnimationFrame(raf)
      if (!visible) return
      draw(now())
      raf = requestAnimationFrame(loop)
    }
    if (calm) draw(4.0)
    else loop()
    canvas.style.opacity = '1'
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      removeEventListener('pointerdown', onDown)
    }
  }, [calm])

  return <canvas ref={ref} className={`size-full opacity-0 transition-opacity duration-700 ${className}`} aria-hidden="true" />
}
