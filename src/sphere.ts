import { point3 } from "./vec3";
import { ray } from './ray'


export class sphere {
  readonly center: point3
  readonly radius: number

  constructor(center: point3, radius: number) {
    this.center = center
    this.radius = radius
  }

  hit(r: ray): boolean {
    const oc = r.origin.sub(this.center)

    const a = r.direction.dot(r.direction)
    const b = 2 * oc.dot(r.direction)
    const c = oc.dot(oc) - this.radius * this.radius

    const discriminant = b * b - 4 * a * c
    return discriminant > 0
  }
}