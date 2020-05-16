import { vec3, color } from './vec3'

test('create null vector', () => {
  const v = new vec3()
  expect(v.x).toBe(0)
  expect(v.y).toBe(0)
  expect(v.z).toBe(0)
})

test('create new vector', () => {
  const v = new vec3(1, 2, 3)
  expect(v.x).toBe(1)
  expect(v.y).toBe(2)
  expect(v.z).toBe(3)
})

test('add two vectors', () => {
  const a = new vec3(1, 2, 3)
  const b = new vec3(4, 5, 6)

  const c = a.add(b)
  expect(c.x).toBe(5)
  expect(c.y).toBe(7)
  expect(c.z).toBe(9)
})

test('substract two vectors', () => {
  const a = new vec3(1, 2, 3)
  const b = new vec3(4, 8, 12)

  const c = a.sub(b)
  expect(c.x).toBe(-3)
  expect(c.y).toBe(-6)
  expect(c.z).toBe(-9)
})

test('get length of vector', () => {
  const a = new vec3()
  expect(a.length()).toBe(0)

  const b = new vec3(3, 0, 0)
  expect(b.length()).toBe(3)

  const c = new vec3(1, 2, 3)
  expect(c.length()).toBe(Math.sqrt(14))
})

test('get unit vector', () => {
  const v = new vec3(2, 0 , 0)
  expect(v.unitVec().equals(new vec3(1, 0, 0))).toBeTruthy()
})

test('vectors are equal', () => {
  expect(new vec3(1, 2, 4).equals(new vec3(1, 2, 4))).toBeTruthy()
})

test('dot peoduct of two vectors', () => {
  const a = new vec3(1, 2, 3)
  const b = new vec3(4, 8, 12)

  const c = a.dot(b)
  expect(c).toBe(56)
})

test('cross peoduct of two vectors', () => {
  const a = new vec3(1, 2, 3)
  const b = new vec3(4, 8, 12)

  const c = a.cross(b)  
  expect(c.equals(new vec3())).toBeTruthy()
})

test('create black', () => {
  const v = new color()
  expect(v.x).toBe(0)
  expect(v.y).toBe(0)
  expect(v.z).toBe(0)
})

test('invalid color', () => {
  expect.assertions(1)
  expect(() => new color(10, 3, 5)).toThrow()
})