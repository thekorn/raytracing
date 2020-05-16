import { point3, vec3, color } from "./vec3"
import { sphere } from './sphere'


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

  color(redSphere: sphere): color {
    const h = redSphere.hit(this)
    if (h > 0) {
      const N = this.at(h)
        .sub(new vec3(0, 0, -1))
        .unitVec()               // each component between -1 and 1
        .add(new vec3(1, 1, 1))  // move range to values between 0 and 2
        .scalarProd(0.5)         // normalize range to 0 and 1 to make it a valid color
      return new color(N.x, N.y, N.z)
    }
    const unitDirection = this.direction.unitVec()
    const t = 0.5 * (unitDirection.y + 1)
    return new color(1, 1, 1).scalarProd(1 - t).add(new color(0.5, 0.7, 1).scalarProd(t))
  }
}