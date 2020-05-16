import * as assert from 'assert';

import { Vec3 } from './vec3';

export class Color extends Vec3 {
  constructor(r = 0, g = 0, b = 0) {
    assert(0 <= r && r <= 1, 'red needs to be between 0 and 1');
    assert(0 <= g && g <= 1, 'yellow needs to be between 0 and 1');
    assert(0 <= b && b <= 1, 'blue needs to be between 0 and 1');
    super(r, g, b);
  }
}
