import { PPMImageFile } from './src/image'
import { color } from './src/vec3'

const imgWidth = 256
const imgHeight = 256

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight)

for (let y = imgHeight - 1; y >= 0 ; --y) {
  for (let x = 0; x < imgWidth; ++x) {
    const c = new color(x / (imgWidth - 1), y / (imgHeight - 1), 0.25)
    img.writeColor(c)
  }
}