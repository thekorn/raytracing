import { point3, vec3, color } from "./vec3"
import { sphere } from './sphere'
import { hittable_list} from './hittableList'
import { hitRecord } from "./hittable"


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

  color(world: hittable_list): color {
    const rec = new hitRecord()
    if (world.hit(this, 0, Infinity, rec)) {
      const N = rec.normal.add(new color(1, 1, 1)).scalarProd(0.5)
      return new color(N.x, N.y, N.z)
    }
    const unitDirection = this.direction.unitVec()
    const t = 0.5 * (unitDirection.y + 1)
    return new color(1, 1, 1).scalarProd(1 - t).add(new color(0.5, 0.7, 1).scalarProd(t))
  }
}