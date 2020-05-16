import { Point3, Vec3 } from './vec3';
import { Ray } from './ray';

export class Camera {
  readonly origin: Point3;
  readonly lowerLeftCorner: Point3;
  readonly horizontal: Vec3;
  readonly vertical: Vec3;

  constructor(origin: Point3, lowerLeftCorner: Point3, horizontal: Vec3, vertical: Vec3) {
    this.origin = origin;
    this.lowerLeftCorner = lowerLeftCorner;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  public static default(): Camera {
    return new Camera(new Point3(0, 0, 0), new Vec3(-2, -1, -1), new Vec3(4, 0, 0), new Point3(0, 2, 0));
  }

  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      this.lowerLeftCorner.add(this.horizontal.scalarProd(u)).add(this.vertical.scalarProd(v).sub(this.origin)),
    );
  }
}
