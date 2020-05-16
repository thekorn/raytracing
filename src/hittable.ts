import { ray } from "./ray"
import { point3, vec3 } from './vec3'

export class hitRecord {
  p: point3
  normal: vec3
  t: number
}

export abstract class hittable {
  abstract hit(r: ray, t_min: number, t_max: number, router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
  }): hitRecord): boolean
}