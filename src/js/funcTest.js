const samplePic = require('../img/sample.jpg');
const cnv = document.createElement('canvas');
document.body.appendChild(cnv);

const start = () => {
  const img = new Image();
  img.src = samplePic;

  img.onload = () => {
    const ctx = cnv.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, 200, 200);
    draw(imageData.data.buffer, 200, 200);
  };
};

const draw = (buffer, width, height) => {
  const sourceBuffer32 = new Uint32Array(buffer);
  const sourceBuffer8 = new Uint8ClampedArray(buffer);

  const start = Date.now();

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      const pos = x + y * width;
      let px = sourceBuffer32[pos];

      // let rgb = {
      //   r: (px >> 0) & 0xff,
      //   g: (px >> 8) & 0xff,
      //   b: (px >> 16) & 0xff,
      // };

      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      px = invert(px);
      // px = invert2(px);

      sourceBuffer32[pos] = px;
    }

    var iData = new ImageData(sourceBuffer8, width, height);
    cnv.getContext('2d').putImageData(iData, 0, 0);
  }

  const time = (Date.now() - start) / 1000;
  console.log('time', time);
};

start();

function invert(px) {
  r = ((px >> 0) & 0xff) ^ 255;
  g = ((px >> 8) & 0xff) ^ 255;
  b = ((px >> 16) & 0xff) ^ 255;
  return 0xff000000 | (b << 16) | (g << 8) | r;
}

function invert2(px) {
  r = ((px >> 0) & 0xff) ^ 255;
  g = ((px >> 8) & 0xff) ^ 255;
  b = ((px >> 16) & 0xff) ^ 255;
  return 0xff000000 | (b << 16) | (g << 8) | r;
}
