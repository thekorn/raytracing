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
