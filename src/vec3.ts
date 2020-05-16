import * as assert from 'assert';

export class Vec3 {
  readonly x: number
  readonly y: number
  readonly z: number

  constructor(x = 0, y = 0, z = 0){
    this.x = x
    this.y = y
    this.z = z
  }

  scalarProd(a: number): Vec3 {
    return new Vec3(a * this.x, a * this.y, a * this.z)
  }

  div(a: number): Vec3 {
    const inv = 1 / a
    return this.scalarProd(inv)
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  sub(v: Vec3): Vec3 {
    return this.add(v.scalarProd(-1))
  }

  dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  cross(v: Vec3): Vec3 {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x 
    )
  }

  unitVec(): Vec3 {
    return this.div(this.length())
  }

  length(): number {
    return Math.sqrt(this.lengthSquared())
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  equals(v: Vec3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }
}

export class Point3 extends Vec3 {}
export class Color extends Vec3 {

  constructor(r = 0, g = 0, b = 0) {
    assert(0 <= r && r <= 1, 'red needs to be between 0 and 1')
    assert(0 <= g && g <= 1, 'yellow needs to be between 0 and 1')
    assert(0 <= b && b <= 1, 'blue needs to be between 0 and 1')
    super(r, g, b)
  }
}