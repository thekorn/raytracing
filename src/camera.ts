import { Point3, Vec3 } from './vec3';
import { Ray } from './ray';
import { degreesToRadian } from './utils';

export class Camera {
  readonly origin: Point3;
  readonly lowerLeftCorner: Point3;
  readonly horizontal: Vec3;
  readonly vertical: Vec3;
  readonly u: Vec3;
  readonly v: Vec3;
  readonly w: Vec3;
  readonly lensRadius: number;

  constructor(
    lookFrom: Point3,
    lookAt: Point3,
    cameraUp: Vec3,
    verticalFov: number,
    aspectRatio: number,
    aperture: number,
    focusDist: number,
  ) {
    this.origin = lookFrom;
    this.lensRadius = aperture / 2;

    const theta = degreesToRadian(verticalFov);
    const halfHeight = Math.tan(theta / 2);
    const halfWidth = aspectRatio * halfHeight;

    this.w = lookFrom.sub(lookAt).unitVec();
    this.u = cameraUp.cross(this.w).unitVec();
    this.v = this.w.cross(this.u);

    this.lowerLeftCorner = this.origin
      .sub(this.u.scalarProd(halfWidth * focusDist))
      .sub(this.v.scalarProd(halfHeight * focusDist))
      .sub(this.w.scalarProd(focusDist));

    this.horizontal = this.u.scalarProd(2 * halfWidth * focusDist);
    this.vertical = this.v.scalarProd(2 * halfHeight * focusDist);
  }

  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      this.lowerLeftCorner.add(this.horizontal.scalarProd(u)).add(this.vertical.scalarProd(v).sub(this.origin)),
    );
  }
}
