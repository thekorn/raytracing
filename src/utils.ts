export function degreesToRadian(degress: number): number {
  return (degress * Math.PI) / 180;
}

export function clamp(x: number, min: number, max: number): number {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

export function randomNumber(min = 0, max = 1): number {
  return min + (max - min) * Math.random();
}

export function schlick(cosine: number, refIdx: number): number {
  const r0 = (1 - refIdx) / (1 + refIdx);
  const r0Squared = r0 * r0;
  return r0Squared + (1 - r0Squared) * Math.pow(1 - cosine, 5);
}
