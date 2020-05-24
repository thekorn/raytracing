import { Color } from './color';
import { randomNumber } from './utils';
import { PPMImageFile } from './image';
import { Camera } from './camera';
import { HittableList } from './hittableList';

interface ImageArgs {
  img: PPMImageFile;
  imgHeight: number;
  imgWidth: number;
}

interface OptArgs {
  maxDepth: number;
  samplesPerPixel: number;
}

export function render(
  progresBar: any,
  cam: Camera,
  world: HittableList,
  imageArgs: ImageArgs,
  optArgs: OptArgs,
): void {
  const { img, imgHeight, imgWidth } = imageArgs;
  const { maxDepth, samplesPerPixel } = optArgs;

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
    progresBar.increment(imgWidth * samplesPerPixel);
  }
}
