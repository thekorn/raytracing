import { Point3, Vec3 } from './vec3';
import { Color } from './color';
import { HittableList } from './hittableList';
import { HitRecord } from './hittable';

export class Ray {
  private _origin: Point3;
  private _direction: Vec3;

  constructor(origin?: Point3, direction?: Vec3) {
    this._origin = origin || new Point3();
    this._direction = direction || new Vec3();
  }

  get origin(): Point3 {
    return this._origin;
  }

  get direction(): Vec3 {
    return this._direction;
  }

  update(r: Ray): void {
    this._origin = r.origin;
    this._direction = r.direction;
  }

  at(t: number): Vec3 {
    return this.origin.add(this.direction.scalarProd(t));
  }

  color(world: HittableList, depth: number): Color {
    const rec = new HitRecord();
    // if we exceed the ray bounce limit, no more light is gathered
    if (depth <= 0) return new Color(0, 0, 0);
    if (world.hit(this, 0.001, Infinity, rec)) {
      const scattered = new Ray();
      const attenuation = new Color();
      if (rec.material.scatter(this, rec, attenuation, scattered)) {
        return attenuation.mul(scattered.color(world, depth - 1));
      }
      return new Color(0, 0, 0);
    }
    const unitDirection = this.direction.unitVec();
    const t = 0.5 * (unitDirection.y + 1);
    return new Color(1, 1, 1).scalarProd(1 - t).add(new Color(0.5, 0.7, 1).scalarProd(t));
  }
}
