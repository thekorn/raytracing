import { PPMImageFile } from './src/image';

const imgWidth = 255
const imgheight = 255

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgheight)

for (let x = 0; x < imgWidth; x++) {
  for (let y = 0; y < imgheight; y++) {
    img.writePixel(x, y, 100)
  }
}