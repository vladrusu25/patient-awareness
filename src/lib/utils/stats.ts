// src/lib/utils/stats.ts
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function linearFitXY(pts: Array<{ x: number; y: number }>) {
  const n = pts.length;
  if (n < 2) return null;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0;
  for (const p of pts) { sx += p.x; sy += p.y; sxy += p.x * p.y; sx2 += p.x * p.x; }
  const denom = n * sx2 - sx * sx;
  if (denom === 0) return null;
  const m = (n * sxy - sx * sy) / denom;
  const b = (sy - m * sx) / n;
  return { m, b };
}
