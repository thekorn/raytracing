import * as fs from 'fs';

import { Color } from './color';
import { clamp } from './utils';

export class PPMImageFile {
  readonly filepath: string;
  readonly stream: fs.WriteStream;

  constructor(path: string, width: number, height: number) {
    this.filepath = path;
    this.stream = fs.createWriteStream(path);
    this.writeHeader(width, height);
  }

  writeLine(data: string): void {
    this.stream.write(`${data}\n`);
  }

  writeHeader(width: number, height: number): void {
    this.writeLine('P3'); // magic number for PPM bitmaps
    this.writeLine(`${width} ${height}`);
    this.writeLine('255'); // max color value
  }

  writePixel(r: number, g: number, b: number): void {
    this.writeLine(`${r} ${g} ${b}`);
  }

  writeColor(c: Color): void {
    const normColor = c.scalarProd(255);
    this.writePixel(Math.floor(normColor.x), Math.floor(normColor.y), Math.floor(normColor.z));
  }
}
