import { Point3, Vec3, Color } from './vec3';
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

  color(world: HittableList): Color {
    const rec = new HitRecord();
    if (world.hit(this, 0, Infinity, rec)) {
      const N = rec.normal.add(new Color(1, 1, 1)).scalarProd(0.5);
      return new Color(N.x, N.y, N.z);
    }
    const unitDirection = this.direction.unitVec();
    const t = 0.5 * (unitDirection.y + 1);
    return new Color(1, 1, 1).scalarProd(1 - t).add(new Color(0.5, 0.7, 1).scalarProd(t));
  }
}
