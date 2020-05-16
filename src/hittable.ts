import { Ray } from './ray';
import { Point3, Vec3 } from './vec3';

export class HitRecord {
  p: Point3;
  normal: Vec3;
  t: number;
  frontFace: boolean;

  setFaceNormal(r: Ray, outwardNormal: Vec3): void {
    this.frontFace = r.direction.dot(outwardNormal) < 0;
    this.normal = this.frontFace ? outwardNormal : outwardNormal.scalarProd(-1);
  }

  update(n: HitRecord): void {
    this.p = n.p;
    this.normal = n.normal;
    this.t = n.t;
    this.frontFace = n.frontFace;
  }
}

export abstract class Hittable {
  abstract hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean;
}
