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

export class Dielectric implements Material {
  readonly reflectionIdx: number;

  constructor(refIdx: number) {
    this.reflectionIdx = refIdx;
  }

  scatter(rIn: Ray, rec: HitRecord, attenuation: Color, scattered: Ray): boolean {
    attenuation.update(new Color(1, 1, 1));
    const etaiOverEtat = rec.frontFace ? 1 / this.reflectionIdx : this.reflectionIdx;
    const unitDirection = rIn.direction.unitVec();

    const cosTheta = Math.min(unitDirection.scalarProd(-1).dot(rec.normal), 1);
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    if (etaiOverEtat * sinTheta > 1) {
      const reflected = unitDirection.reflect(rec.normal);
      scattered.update(new Ray(rec.p, reflected));
      return true;
    }
    const refracted = unitDirection.refract(rec.normal, etaiOverEtat);
    scattered.update(new Ray(rec.p, refracted));
    return true;
  }
}
