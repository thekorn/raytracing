import * as assert from 'assert';

export class vec3 {
  readonly x: number
  readonly y: number
  readonly z: number

  constructor(x: number = 0, y: number = 0, z: number = 0){
    this.x = x
    this.y = y
    this.z = z
  }

  scalarProd(a: number): vec3 {
    return new vec3(a * this.x, a * this.y, a * this.z)
  }

  div(a: number): vec3 {
    const inv = 1 / a
    return this.scalarProd(inv)
  }

  add(v: vec3): vec3 {
    return new vec3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  sub(v: vec3): vec3 {
    return this.add(v.scalarProd(-1))
  }

  dot(v: vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  cross(v: vec3): vec3 {
    return new vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x 
    )
  }

  unitVec(): vec3 {
    return this.div(this.length())
  }

  length(): number {
    return Math.sqrt(this.length_squared())
  }

  length_squared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  equals(v: vec3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }
}

export class point3 extends vec3 {}
export class color extends vec3 {

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    assert(0 <= r && r <= 1, `red needs to be between 0 and 1, got ${r}`)
    assert(0 <= g && g <= 1, `yellow needs to be between 0 and 1, got ${g}`)
    assert(0 <= b && b <= 1, `blue needs to be between 0 and 1, got ${b}`)
    super(r, g, b)
  }
}