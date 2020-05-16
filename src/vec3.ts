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

  add(v: vec3): vec3 {
    return new vec3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  sub(v: vec3): vec3 {
    return this.add(v.scalarProd(-1))
  }

  length(): number {
    return Math.sqrt(this.length_squared())
  }

  length_squared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
}

export class point3 extends vec3 {}
export class color extends vec3 {}