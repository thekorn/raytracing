import { HittableList } from './hittableList';
import { Sphere } from './sphere';
import { Point3, Vec3 } from './vec3';
import { Lambertian, Metal, Dielectric } from './material';
import { Color } from './color';
import { randomNumber } from './utils';

export function generateRandomScene(): HittableList {
  const world = new HittableList();

  world.add(new Sphere(new Point3(0, -1000, 0), 1000, new Lambertian(new Color(0.5, 0.5, 0.5)))); // horizon

  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const chooseMaterial = randomNumber();
      const center = new Point3(a + 0.9 * randomNumber(), 0.2, b + 0.9 * randomNumber());
      if (center.sub(new Vec3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMaterial < 0.8) {
          // diffuse
          const albedo = Color.random().mul(Color.random());
          world.add(new Sphere(center, 0.2, new Lambertian(albedo)));
        } else if (chooseMaterial < 0.95) {
          // metal
          const albedo = Color.random(0.5, 1);
          const fuzz = randomNumber(0, 0.5);
          world.add(new Sphere(center, 0.2, new Metal(albedo, fuzz)));
        } else {
          // glass
          world.add(new Sphere(center, 0.2, new Dielectric(1.5)));
        }
      }
    }
  }

  world.add(new Sphere(new Point3(0, 1, 0), 1, new Dielectric(1.5)));
  world.add(new Sphere(new Point3(-4, 1, 0), 1, new Lambertian(new Color(0.4, 0.2, 0.1))));
  world.add(new Sphere(new Point3(4, 1, 0), 1, new Metal(new Color(0.7, 0.6, 0.5))));
  return world;
}
