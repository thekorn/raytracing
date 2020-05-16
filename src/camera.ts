import { Point3, Vec3 } from './vec3';
import { Ray } from './ray';
import { degreesToRadian } from './utils';

export class Camera {
  readonly origin: Point3;
  readonly lowerLeftCorner: Point3;
  readonly horizontal: Vec3;
  readonly vertical: Vec3;

  constructor(verticalFov: number, aspectRatio: number) {
    this.origin = new Point3(0, 0, 0);

    const theta = degreesToRadian(verticalFov);
    const halfHeight = Math.tan(theta / 2);
    const halfWidth = aspectRatio * halfHeight;

    this.lowerLeftCorner = new Point3(-1 * halfWidth, -1 * halfHeight, -1);
    this.horizontal = new Vec3(2 * halfWidth, 0, 0);
    this.vertical = new Vec3(0, 2 * halfHeight, 0);
  }

  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      this.lowerLeftCorner.add(this.horizontal.scalarProd(u)).add(this.vertical.scalarProd(v).sub(this.origin)),
    );
  }
}
