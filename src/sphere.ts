import { point3 } from "./vec3";
import { ray } from './ray'


export class sphere {
  readonly center: point3
  readonly radius: number

  constructor(center: point3, radius: number) {
    this.center = center
    this.radius = radius
  }

  hit(r: ray): number {
    const oc = r.origin.sub(this.center)

    const a = r.direction.length_squared()
    const halfB = oc.dot(r.direction)
    const c = oc.length_squared() - this.radius * this.radius

    const discriminant = halfB * halfB  - a * c
    if (discriminant < 0) return -1
    return (-1 * halfB - Math.sqrt(discriminant)) / a
  }
}