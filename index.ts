import * as cliProgress from 'cli-progress';

import { PPMImageFile } from './src/image';
import { Point3, Vec3 } from './src/vec3';
import { Camera } from './src/camera';
import { Color } from './src/color';
import { randomNumber } from './src/utils';
import { generateRandomScene } from './src/world';

const filename = process.argv[2] || '/tmp/image.ppm';

const aspectRatio = 16 / 9;
const imgWidth = 384;
const imgHeight = imgWidth / aspectRatio;
const samplesPerPixel = 100;
const maxDepth = 50;

const img = new PPMImageFile(filename, imgWidth, imgHeight);

const world = generateRandomScene();

const lookFrom = new Point3(13, 2, 3);
const lookAt = new Point3(0, 0, 0);
const cameraUp = new Vec3(0, 1, 0);

const distToFocus = 10;
const aperture = 0.1;

const cam = new Camera(
  lookFrom,
  lookAt,
  cameraUp,
  20,
  aspectRatio,
  aperture,
  distToFocus,
);

const opt = {
  format:
    '{bar} {percentage}% | ETA: {eta}s | {value}/{total} | Duration: {duration_formatted}',
};
const progresBar = new cliProgress.SingleBar(
  opt,
  cliProgress.Presets.shades_classic,
);
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
