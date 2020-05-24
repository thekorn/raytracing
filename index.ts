import * as cliProgress from 'cli-progress';

import { PPMImageFile } from './src/image';
import { setup } from './src/world';
import { render } from './src/render';

const filename = process.argv[2] || '/tmp/image.ppm';

const { world, cam, aspectRatio, samplesPerPixel, maxDepth } = setup();

const imgWidth = 384;
const imgHeight = imgWidth / aspectRatio;

const img = new PPMImageFile(filename, imgWidth, imgHeight);

const opt = {
  format:
    '{bar} {percentage}% | ETA: {eta}s | {value}/{total} | Duration: {duration_formatted}',
};
const progresBar = new cliProgress.SingleBar(
  opt,
  cliProgress.Presets.shades_classic,
);
progresBar.start(imgHeight * imgWidth * samplesPerPixel, 0);

render(
  progresBar,
  cam,
  world,
  { img, imgHeight, imgWidth },
  { maxDepth, samplesPerPixel },
);

progresBar.stop();
