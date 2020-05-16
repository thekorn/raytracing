import { Vec3 } from './vec3';

test('create null vector', () => {
  const v = new Vec3();
  expect(v.x).toBe(0);
  expect(v.y).toBe(0);
  expect(v.z).toBe(0);
});

test('create new vector', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.x).toBe(1);
  expect(v.y).toBe(2);
  expect(v.z).toBe(3);
});

test('add two vectors', () => {
  const a = new Vec3(1, 2, 3);
  const b = new Vec3(4, 5, 6);

  const c = a.add(b);
  expect(c.x).toBe(5);
  expect(c.y).toBe(7);
  expect(c.z).toBe(9);
});

test('substract two vectors', () => {
  const a = new Vec3(1, 2, 3);
  const b = new Vec3(4, 8, 12);

  const c = a.sub(b);
  expect(c.x).toBe(-3);
  expect(c.y).toBe(-6);
  expect(c.z).toBe(-9);
});

test('get length of vector', () => {
  const a = new Vec3();
  expect(a.length()).toBe(0);

  const b = new Vec3(3, 0, 0);
  expect(b.length()).toBe(3);

  const c = new Vec3(1, 2, 3);
  expect(c.length()).toBe(Math.sqrt(14));
});

test('get unit vector', () => {
  const v = new Vec3(2, 0, 0);
  expect(v.unitVec().equals(new Vec3(1, 0, 0))).toBeTruthy();
});

test('vectors are equal', () => {
  expect(new Vec3(1, 2, 4).equals(new Vec3(1, 2, 4))).toBeTruthy();
});

test('dot peoduct of two vectors', () => {
  const a = new Vec3(1, 2, 3);
  const b = new Vec3(4, 8, 12);

  const c = a.dot(b);
  expect(c).toBe(56);
});

test('cross peoduct of two vectors', () => {
  const a = new Vec3(1, 2, 3);
  const b = new Vec3(4, 8, 12);

  const c = a.cross(b);
  expect(c.equals(new Vec3())).toBeTruthy();
});

test('test map function on Vec3', () => {
  const a = new Vec3(1, 2, 3);
  const b = a.map((x: number) => x + 1);

  expect(b.equals(new Vec3(2, 3, 4))).toBeTruthy();
});
