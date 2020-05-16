import { Point3, Vec3 } from './vec3';
import { Color } from './color';
import { HittableList } from './hittableList';
import { HitRecord } from './hittable';

export class Ray {
  readonly origin: Point3;
  readonly direction: Vec3;

  constructor(origin?: Point3, direction?: Vec3) {
    this.origin = origin || new Point3();
    this.direction = direction || new Vec3();
  }

  at(t: number): Vec3 {
    return this.origin.add(this.direction.scalarProd(t));
  }

  color(world: HittableList, depth: number): Color {
    const rec = new HitRecord();
    // if we exceed the ray bounce limit, no more light is gathered
    if (depth <= 0) return new Color(0, 0, 0);
    if (world.hit(this, 0, Infinity, rec)) {
      const target = rec.p.add(rec.normal).add(Vec3.randomInUnitSphere());
      const r = new Ray(rec.p, target.sub(rec.p));
      const N = r.color(world, depth - 1).scalarProd(0.5);
      return new Color(N.x, N.y, N.z);
    }
    const unitDirection = this.direction.unitVec();
    const t = 0.5 * (unitDirection.y + 1);
    return new Color(1, 1, 1).scalarProd(1 - t).add(new Color(0.5, 0.7, 1).scalarProd(t));
  }
}
