import { PPMImageFile } from './src/image'
import { point3, vec3 } from './src/vec3'
import { ray } from './src/ray'
import { sphere } from './src/sphere'
import { hittable_list } from './src/hittableList'

const aspectRatio = 16 / 9
const imgWidth = 384
const imgHeight = imgWidth / aspectRatio

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight)

const origin = new point3(0, 0, 0)
const horizontal = new vec3(4, 0, 0)
const vertical = new vec3(0, 2, 0)
const lowerLeftCorner = new point3(-2, -1, -1)

const world = new hittable_list()
world.add(new sphere(new point3(0, -100.5, -1), 100))
world.add(new sphere(new point3(0, 0, -1), 0.5))

for (let y = imgHeight - 1; y >= 0 ; --y) {
  for (let x = 0; x < imgWidth; ++x) {
    const u = x / (imgWidth - 1)
    const v = y / (imgHeight - 1)

    const r = new ray(origin, lowerLeftCorner.add(horizontal.scalarProd(u)).add(vertical.scalarProd(v)))
    
    const pixelColor = r.color(world)
    img.writeColor(pixelColor)
  }
}