import { point3 } from "./vec3";
import { ray } from './ray'
import { hittable, hitRecord } from './hittable'
import { receiveMessageOnPort } from "worker_threads";


export class sphere implements hittable {
  readonly center: point3
  readonly radius: number

  constructor(center: point3, radius: number) {
    this.center = center
    this.radius = radius
  }

  hit(r: ray, t_min: number, t_max: number, rec: hitRecord): boolean {
    const oc = r.origin.sub(this.center)

    const a = r.direction.length_squared()
    const halfB = oc.dot(r.direction)
    const c = oc.length_squared() - this.radius * this.radius

    const discriminant = halfB * halfB  - a * c
    if (discriminant < 0) {
      const root = Math.sqrt(discriminant)
      let temp = (-1 * halfB - root) / a
      if (temp < t_max && temp > t_min) {
        rec.t = temp
        rec.p = r.at(rec.t)
        const outward_normal = rec.p.sub(this.center).div(this.radius)
        rec.set_face_normal(r, outward_normal)
        return true
      }
      temp = (-1* halfB + root) / a
      if (temp < t_max && temp > t_min) {
        rec.t = temp
        rec.p = r.at(rec.t)
        const outward_normal = rec.p.sub(this.center).div(this.radius)
        rec.set_face_normal(r, outward_normal)
        return true
      }
    }
    return false
  }
}