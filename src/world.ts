import { HittableList } from './hittableList';
import { Sphere } from './sphere';
import { Point3, Vec3 } from './vec3';
import { Lambertian, Metal, Dielectric } from './material';
import { Color } from './color';
import { randomNumber } from './utils';
import { Camera } from './camera';

export function generateRandomScene(): HittableList {
  const world = new HittableList();

  // horizon
  world.add(
    new Sphere(
      new Point3(0, -1000, 0),
      1000,
      new Lambertian(new Color(0.5, 0.5, 0.5)),
    ),
  );

  // random spheres on the ground
  // material distribution:
  //    * 80% Lambertian
  //    * 15% Metal
  //    *  5% Glass
  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const chooseMaterial = randomNumber();
      const center = new Point3(
        a + 0.9 * randomNumber(),
        0.2,
        b + 0.9 * randomNumber(),
      );
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

  // Big spheres in the center
  world.add(new Sphere(new Point3(0, 1, 0), 1, new Dielectric(1.5)));
  world.add(
    new Sphere(
      new Point3(-4, 1, 0),
      1,
      new Lambertian(new Color(0.4, 0.2, 0.1)),
    ),
  );
  world.add(
    new Sphere(new Point3(4, 1, 0), 1, new Metal(new Color(0.7, 0.6, 0.5))),
  );
  return world;
}

interface WorldSetup {
  world: HittableList;
  cam: Camera;
  aspectRatio: number;
  samplesPerPixel: number;
  maxDepth: number;
}

export function setup(): WorldSetup {
  const world = generateRandomScene();

  const lookFrom = new Point3(13, 2, 3);
  const lookAt = new Point3(0, 0, 0);
  const cameraUp = new Vec3(0, 1, 0);

  const distToFocus = 10;
  const aperture = 0.1;
  const aspectRatio = 16 / 9;

  const samplesPerPixel = 100;
  const maxDepth = 50;

  const cam = new Camera(
    lookFrom,
    lookAt,
    cameraUp,
    20,
    aspectRatio,
    aperture,
    distToFocus,
  );

  return {
    cam,
    world,
    aspectRatio,
    samplesPerPixel,
    maxDepth,
  };
}
