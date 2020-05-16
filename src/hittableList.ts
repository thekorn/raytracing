import { Hittable, HitRecord } from "./hittable"
import { Ray } from './ray'

export class HittableList implements Hittable {

  private list: Array<Hittable>

  constructor(object?: Hittable) {
    this.clear()
    if (object) this.add(object)
  }

  clear(): void {
    this.list = []
  }

  add(object: Hittable): void {
    this.list.push(object)
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    const tempRec = new HitRecord()
    let hitAnything = false
    let closestSoFar = tMax

    this.list.forEach((object) => {
      if (object.hit(r, tMin, closestSoFar, tempRec)) {
        hitAnything = true
        closestSoFar = tempRec.t
        rec.update(tempRec)
      }
    })
    return hitAnything
  }
}