import { randomNumber } from './utils';

export class Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static random(min = 0, max = 1): Vec3 {
    return new Vec3(randomNumber(min, max), randomNumber(min, max), randomNumber(min, max));
  }

  public static randomInUnitSphere(): Vec3 {
    while (true) {
      const p = Vec3.random(-1, 1);
      if (p.lengthSquared() >= 1) continue;
      return p;
    }
  }

  public static randomInHemisphere(normal: Vec3): Vec3 {
    const inUnitSphere = Vec3.randomInUnitSphere();
    if (inUnitSphere.dot(normal) > 0) {
      // in the same hemnisphere as the normal
      return inUnitSphere;
    } else {
      return inUnitSphere.scalarProd(-1);
    }
  }

  public static randomUnitVector(): Vec3 {
    const a = randomNumber(0, 2 * Math.PI);
    const z = randomNumber(-1, 1);
    const r = Math.sqrt(1 - z * z);
    return new Vec3(r * Math.cos(a), r * Math.sin(a), z);
  }

  scalarProd(a: number): Vec3 {
    return new Vec3(a * this.x, a * this.y, a * this.z);
  }

  div(a: number): Vec3 {
    const inv = 1 / a;
    return this.scalarProd(inv);
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vec3): Vec3 {
    return this.add(v.scalarProd(-1));
  }

  dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vec3): Vec3 {
    return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
  }

  unitVec(): Vec3 {
    return this.div(this.length());
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  equals(v: Vec3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  map(f: Function): Vec3 {
    return new Vec3(f(this.x), f(this.y), f(this.z));
  }
}

export class Point3 extends Vec3 {}
