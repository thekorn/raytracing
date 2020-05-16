import { PPMImageFile } from './src/image';
import { Point3 } from './src/vec3';
import { Sphere } from './src/sphere';
import { HittableList } from './src/hittableList';
import { Camera } from './src/camera';
import { Color } from './src/color';
import { randomNumber } from './src/utils';

const aspectRatio = 16 / 9;
const imgWidth = 384;
const imgHeight = imgWidth / aspectRatio;
const samplesPerPixel = 100;

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight);

const world = new HittableList();
world.add(new Sphere(new Point3(0, -100.5, -1), 100));
world.add(new Sphere(new Point3(0, 0, -1), 0.5));

const cam = Camera.default();

for (let y = imgHeight - 1; y >= 0; --y) {
  for (let x = 0; x < imgWidth; ++x) {
    let pixelColor = new Color(0, 0, 0);
    for (let s = 0; s < samplesPerPixel; ++s) {
      const u = (x + randomNumber()) / (imgWidth - 1);
      const v = (y + randomNumber()) / (imgHeight - 1);
      const r = cam.getRay(u, v);
      pixelColor = pixelColor.add(r.color(world));
    }
    img.writeColor(pixelColor, samplesPerPixel);
  }
}
