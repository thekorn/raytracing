import { Ray } from './ray';
import { HitRecord } from './hittable';
import { Color } from './color';
import { Vec3 } from './vec3';

export abstract class Material {
  abstract scatter(rIn: Ray, rec: HitRecord, attenuation: Color, scattered: Ray): boolean;
}

export class Lambertian implements Material {
  readonly albedo: Color;

  constructor(albedo: Color) {
    this.albedo = albedo;
  }

  scatter(rIn: Ray, rec: HitRecord, attenuation: Color, scattered: Ray): boolean {
    // const scatterDirection = rec.normal.add(Vec3.randomUnitVector()); // FIXME: is a bug according to https://github.com/RayTracing/raytracing.github.io/issues/530
    const scatterDirection = rec.normal.add(Vec3.randomInUnitSphere());
    scattered.update(new Ray(rec.p, scatterDirection));
    attenuation.update(this.albedo);
    return true;
  }
}

export class Metal implements Material {
  readonly albedo: Color;
  readonly fuzz: number;

  constructor(albedo: Color, fuzz = 0) {
    this.albedo = albedo;
    this.fuzz = fuzz < 1 ? fuzz : 1;
  }

  scatter(rIn: Ray, rec: HitRecord, attenuation: Color, scattered: Ray): boolean {
    const reflected = rIn.direction.unitVec().reflect(rec.normal);
    scattered.update(new Ray(rec.p, reflected.add(Vec3.randomInUnitSphere().scalarProd(this.fuzz))));
    attenuation.update(this.albedo);
    return scattered.direction.dot(rec.normal) > 0;
  }
}
