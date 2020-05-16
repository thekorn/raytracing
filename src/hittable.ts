import { ray } from "./ray"
import { point3, vec3 } from './vec3'

export class hitRecord {
  p: point3
  normal: vec3
  t: number
  front_face: boolean

  set_face_normal(r: ray, outward_normal: vec3) {
    this.front_face = r.direction.dot(outward_normal) < 0
    this.normal = this.front_face ? outward_normal : outward_normal.scalarProd(-1)
  }

  update(n: hitRecord) {
    this.p = n.p
    this.normal = n.normal
    this.t = n.t
    this.front_face = n.front_face
  }
}

export abstract class hittable {
  abstract hit(r: ray, t_min: number, t_max: number, rec: hitRecord): boolean
}