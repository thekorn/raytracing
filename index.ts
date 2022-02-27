import { PPMImageFile } from './src/image';

const imgWidth = 255
const imgHeight = 255

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight)


for (let y = imgHeight; y >= 0; y--) {
  for (let x = 0; x < imgWidth; x++) {
    img.writePixel(x, y, 63)
  }
}