import { useEffect, useRef } from 'react'
import { AbsoluteFill, continueRender, delayRender, useCurrentFrame, useVideoConfig } from 'remotion'
import { LOOP_SECONDS } from '../theme'

/**
 * Permukaan kolam (caustics) dengan WebGL, deterministik per frame.
 * Waktu dibuat periodik (LOOP_SECONDS) supaya video bisa diputar berulang tanpa sambungan terlihat.
 * `depth` 0 = permukaan cerah, 1 = di dalam air (lebih gelap, sinar matahari tampak).
 */
const frag = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uPhase;   // 0..2PI, periodik
uniform float uDepth;   // 0 permukaan .. 1 bawah air
uniform vec3 uRip;      // x,y (px), umur (detik) riak; umur < 0 = tidak ada
vec2 hash2(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
float cellEdge(vec2 p, float ph){
  vec2 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++){
    vec2 g = vec2(float(x), float(y)); vec2 o = hash2(i + g);
    o = 0.5 + 0.42 * sin(ph + 6.2831 * o);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return d2 - d1;
}
float caustics(vec2 p, float ph){
  p += 0.18 * vec2(sin(p.y * 1.3 + ph), cos(p.x * 1.1 - ph));
  float a = cellEdge(p, ph);
  float b = cellEdge(p * 1.37 + vec2(3.1, 1.7), 2.0 * ph + 1.3);
  return exp(-a * 7.0) + exp(-b * 7.5) * 0.7;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.x * 3.4;
  vec2 off = vec2(0.0); float ring = 0.0;
  if (uRip.z >= 0.0){
    vec2 rp = (uRip.xy - 0.5 * uRes) / uRes.x * 3.4;
    vec2 d = p - rp; float dist = length(d); float front = uRip.z * 2.2;
    float w = sin((dist - front) * 10.0) * exp(-abs(dist - front) * 3.0) * exp(-uRip.z * 0.9);
    off += d / (dist + 0.001) * w * 0.22; ring = max(w, 0.0);
  }
  float c = caustics(p + off, uPhase);
  // permukaan: biru muda cerah ala poster
  vec3 top = mix(vec3(0.36, 0.78, 0.90), vec3(0.58, 0.88, 0.95), uv.y);
  vec3 surf = top + vec3(0.92, 1.0, 1.0) * c * 0.22 + ring * 0.3;
  // bawah air: teal dalam dengan sinar
  vec3 deep = mix(vec3(0.03, 0.27, 0.34), vec3(0.12, 0.55, 0.64), pow(uv.y, 1.4));
  float rays = 0.0;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float x = uv.x + (1.0 - uv.y) * 0.35 - 0.12 - fi * 0.22 + 0.02 * sin(uPhase + fi);
    rays += smoothstep(0.05, 0.0, abs(x)) * (0.5 + 0.5 * sin(uPhase * (fi < 2.0 ? 1.0 : 2.0) + fi * 1.7));
  }
  vec3 under = deep + vec3(0.6, 0.95, 1.0) * (c * 0.10 * uv.y + rays * 0.12 * uv.y);
  gl_FragColor = vec4(mix(surf, under, uDepth), 1.0);
}`

export function Water({ depth = 0, ripple, scale = 0.5 }: { depth?: number; ripple?: { x: number; y: number; age: number }; scale?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const gl = useRef<{ ctx: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null> } | null>(null)
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('webgl', { preserveDrawingBuffer: true, antialias: false })
    if (!ctx) return
    const sh = (t: number, s: string) => {
      const x = ctx.createShader(t)!
      ctx.shaderSource(x, s)
      ctx.compileShader(x)
      if (!ctx.getShaderParameter(x, ctx.COMPILE_STATUS)) console.error(ctx.getShaderInfoLog(x))
      return x
    }
    const prog = ctx.createProgram()!
    ctx.attachShader(prog, sh(ctx.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'))
    ctx.attachShader(prog, sh(ctx.FRAGMENT_SHADER, frag))
    ctx.linkProgram(prog)
    ctx.useProgram(prog)
    const buf = ctx.createBuffer()
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf)
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW)
    const loc = ctx.getAttribLocation(prog, 'a')
    ctx.enableVertexAttribArray(loc)
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0)
    gl.current = { ctx, u: { res: ctx.getUniformLocation(prog, 'uRes'), phase: ctx.getUniformLocation(prog, 'uPhase'), depth: ctx.getUniformLocation(prog, 'uDepth'), rip: ctx.getUniformLocation(prog, 'uRip') } }
  }, [])

  useEffect(() => {
    const g = gl.current
    if (!g) return
    const handle = delayRender('water')
    const { ctx, u } = g
    const w = ref.current!.width, h = ref.current!.height
    ctx.viewport(0, 0, w, h)
    ctx.uniform2f(u.res, w, h)
    ctx.uniform1f(u.phase, ((frame / fps) / LOOP_SECONDS) * Math.PI * 2)
    ctx.uniform1f(u.depth, depth)
    ctx.uniform3f(u.rip, ripple ? ripple.x * scale : 0, ripple ? (height - ripple.y) * scale : 0, ripple ? ripple.age : -1)
    ctx.drawArrays(ctx.TRIANGLES, 0, 3)
    ctx.finish()
    continueRender(handle)
  }, [frame, fps, depth, ripple, scale, height])

  return (
    <AbsoluteFill>
      <canvas ref={ref} width={Math.round(width * scale)} height={Math.round(height * scale)} style={{ width: '100%', height: '100%' }} />
    </AbsoluteFill>
  )
}
