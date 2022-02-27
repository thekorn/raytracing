import { PPMImageFile } from './src/image'
import { color } from './src/vec3'

const imgWidth = 255
const imgHeight = 255

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight)

for (let y = imgHeight; y >= 0; y--) {
  for (let x = 0; x < imgWidth; x++) {
    const c = new color(x / imgWidth, y / imgHeight, 0.25)
    img.writeColor(c)
  }
}