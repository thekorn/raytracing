import * as cliProgress from 'cli-progress';

import { PPMImageFile } from './src/image';
import { Point3 } from './src/vec3';
import { Sphere } from './src/sphere';
import { HittableList } from './src/hittableList';
import { Camera } from './src/camera';
import { Color } from './src/color';
import { randomNumber } from './src/utils';
import { Lambertian, Metal } from './src/material';

const filename = process.argv[2] || '/tmp/image.ppm';

const aspectRatio = 16 / 9;
const imgWidth = 384;
const imgHeight = imgWidth / aspectRatio;
const samplesPerPixel = 100;
const maxDepth = 50;

const img = new PPMImageFile(filename, imgWidth, imgHeight);

const world = new HittableList();
world.add(new Sphere(new Point3(0, -100.5, -1), 100, new Lambertian(new Color(0.8, 0.8, 0.0))));
world.add(new Sphere(new Point3(0, 0, -1), 0.5, new Lambertian(new Color(0.7, 0.3, 0.3))));

world.add(new Sphere(new Point3(1, 0, -1), 0.5, new Metal(new Color(0.8, 0.6, 0.2))));
world.add(new Sphere(new Point3(-1, 0, -1), 0.5, new Metal(new Color(0.8, 0.8, 0.8))));

const cam = Camera.default();

const progresBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
progresBar.start(imgHeight * imgWidth * samplesPerPixel, 0);

for (let y = imgHeight - 1; y >= 0; --y) {
  for (let x = 0; x < imgWidth; ++x) {
    let pixelColor = new Color(0, 0, 0);
    for (let s = 0; s < samplesPerPixel; ++s) {
      const u = (x + randomNumber()) / (imgWidth - 1);
      const v = (y + randomNumber()) / (imgHeight - 1);
      const r = cam.getRay(u, v);
      pixelColor = pixelColor.add(r.color(world, maxDepth));
    }
    img.writeColor(pixelColor, samplesPerPixel);
  }
  progresBar.update((imgHeight - y) * imgWidth * samplesPerPixel);
}
progresBar.stop();
