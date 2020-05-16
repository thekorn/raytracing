import { Point3 } from './vec3';
import { Ray } from './ray';
import { Hittable, HitRecord } from './hittable';
import { Material } from './material';

export class Sphere implements Hittable {
  readonly center: Point3;
  readonly radius: number;
  readonly material: Material;

  constructor(center: Point3, radius: number, material: Material) {
    this.center = center;
    this.radius = radius;
    this.material = material;
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    const oc = r.origin.sub(this.center);

    const a = r.direction.lengthSquared();
    const halfB = oc.dot(r.direction);
    const c = oc.lengthSquared() - this.radius * this.radius;

    const discriminant = halfB * halfB - a * c;
    if (discriminant > 0) {
      const root = Math.sqrt(discriminant);
      let temp = (-1 * halfB - root) / a;
      if (temp < tMax && temp > tMin) {
        rec.t = temp;
        rec.p = r.at(temp);
        const outwardNormal = rec.p.sub(this.center).div(this.radius);
        rec.setFaceNormal(r, outwardNormal);
        rec.material = this.material;
        return true;
      }
      temp = (-1 * halfB + root) / a;
      if (temp < tMax && temp > tMin) {
        rec.t = temp;
        rec.p = r.at(rec.t);
        const outwardNormal = rec.p.sub(this.center).div(this.radius);
        rec.setFaceNormal(r, outwardNormal);
        rec.material = this.material;
        return true;
      }
    }
    return false;
  }
}
