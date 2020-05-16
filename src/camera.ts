import { Point3, Vec3 } from './vec3';
import { Ray } from './ray';
import { degreesToRadian } from './utils';

export class Camera {
  readonly origin: Point3;
  readonly lowerLeftCorner: Point3;
  readonly horizontal: Vec3;
  readonly vertical: Vec3;

  constructor(lookFrom: Point3, lookAt: Point3, cameraUp: Vec3, verticalFov: number, aspectRatio: number) {
    this.origin = lookFrom;

    const theta = degreesToRadian(verticalFov);
    const halfHeight = Math.tan(theta / 2);
    const halfWidth = aspectRatio * halfHeight;

    const w = lookFrom.sub(lookAt).unitVec();
    const u = cameraUp.cross(w).unitVec();
    const v = w.cross(u);

    this.lowerLeftCorner = this.origin.sub(u.scalarProd(halfHeight)).sub(v.scalarProd(halfHeight)).sub(w);
    this.horizontal = u.scalarProd(2 * halfWidth);
    this.vertical = v.scalarProd(2 * halfHeight);
  }

  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      this.lowerLeftCorner.add(this.horizontal.scalarProd(u)).add(this.vertical.scalarProd(v).sub(this.origin)),
    );
  }
}
