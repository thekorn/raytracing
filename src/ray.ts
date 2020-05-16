import { point3, vec3, color } from "./vec3";


export class ray {
  readonly origin: point3
  readonly direction: vec3

  constructor(origin?: point3, direction?: vec3) {
    this.origin = origin || new point3()
    this.direction = direction || new vec3()
  }

  at(t: number): vec3 {
    return this.origin.add(this.direction.scalarProd(t))
  }

  color(): color {
    const unitDirection = this.direction.unitVec()
    const t = 0.5 * (unitDirection.y + 1)
    return new color(1, 1, 1).scalarProd(1 - t).add(new color(0.5, 0.7, 1).scalarProd(t))
  }
}