import { hittable, hitRecord } from "./hittable"
import { ray } from './ray'

export class hittable_list implements hittable {

  private list: Array<hittable>

  constructor(object?: hittable) {
    this.clear()
    if (object) this.add(object)
  }

  clear() {
    this.list = new Array()
  }

  add(object: hittable) {
    this.list.push(object)
  }

  hit(r: ray, t_min: number, t_max: number, rec: hitRecord): boolean {
    const temp_rec = new hitRecord()
    let hit_anything = false
    let closest_so_far = t_max

    this.list.forEach((object) => {
      if (object.hit(r, t_min, closest_so_far, temp_rec)) {
        hit_anything = true
        closest_so_far = temp_rec.t
        rec.update(temp_rec)
      }
    })
    return hit_anything
  }
}