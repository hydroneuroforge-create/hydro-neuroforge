/** Potongan GLSL bersama (caustics air & kabut bawah air). Ditulis sendiri — bebas lisensi. */

export const causticsGLSL = /* glsl */ `
vec2 hnc_hash2(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
// jarak ke tepi sel Voronoi bergerak -> garis-garis terang khas pantulan cahaya di kolam
float hnc_cellEdge(vec2 p, float t){
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++){
    vec2 g = vec2(float(x), float(y));
    vec2 o = hnc_hash2(i + g);
    o = 0.5 + 0.42 * sin(t + 6.2831 * o);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return d2 - d1;
}
float hnc_caustics(vec2 p, float t){
  p += 0.18 * vec2(sin(p.y * 1.3 + t * 0.7), cos(p.x * 1.1 - t * 0.6));
  float a = hnc_cellEdge(p, t * 0.9);
  float b = hnc_cellEdge(p * 1.37 + vec2(3.1, 1.7), t * 1.13 + 1.3);
  return exp(-a * 7.5) + exp(-b * 8.0) * 0.75;
}
`

export const fogGLSL = /* glsl */ `
uniform vec3 uFogColor;
uniform float uFogDensity;
vec3 hnc_fog(vec3 col, float dist){
  float f = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
  return mix(col, uFogColor, clamp(f, 0.0, 1.0));
}
float hnc_fogAmount(float dist){
  return clamp(1.0 - exp(-uFogDensity * uFogDensity * dist * dist), 0.0, 1.0);
}
`
