import { PPMImageFile } from './src/image'
import { Point3, Vec3 } from './src/Vec3'
import { Ray } from './src/ray'
import { Sphere } from './src/sphere'
import { HittableList } from './src/hittableList'

const aspectRatio = 16 / 9
const imgWidth = 384
const imgHeight = imgWidth / aspectRatio

const img = new PPMImageFile('/tmp/boo.ppm', imgWidth, imgHeight)

const origin = new Point3(0, 0, 0)
const horizontal = new Vec3(4, 0, 0)
const vertical = new Vec3(0, 2, 0)
const lowerLeftCorner = new Point3(-2, -1, -1)

const world = new HittableList()
world.add(new Sphere(new Point3(0, -100.5, -1), 100))
world.add(new Sphere(new Point3(0, 0, -1), 0.5))

for (let y = imgHeight - 1; y >= 0 ; --y) {
  for (let x = 0; x < imgWidth; ++x) {
    const u = x / (imgWidth - 1)
    const v = y / (imgHeight - 1)

    const r = new Ray(origin, lowerLeftCorner.add(horizontal.scalarProd(u)).add(vertical.scalarProd(v)))
    
    const pixelColor = r.color(world)
    img.writeColor(pixelColor)
  }
}