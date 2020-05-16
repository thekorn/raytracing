import { Color } from './color';

test('create black', () => {
  const v = new Color();
  expect(v.x).toBe(0);
  expect(v.y).toBe(0);
  expect(v.z).toBe(0);
});

test('invalid color', () => {
  expect.assertions(1);
  expect(() => new Color(10, 3, 5)).toThrow();
});
