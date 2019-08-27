import FrameRater from './FrameRater';

class Effective {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.effectsChain = [];
  }

  showFrameRate() {
    this.showFrameRate = true;
    this.fr = this.fr ? this.fr : new FrameRater();
  }

  addEffect(effectName) {
    this.effectsChain.push(effectName);
  }

  initCanvas(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
  }

  draw(imageBitmap) {
    if (!this.context) return;
    if (!this.width || !this.height) {
      this.width = imageBitmap.width;
      this.height = imageBitmap.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    // const imageData = imageBitmap;
    this.context.drawImage(imageBitmap, 0, 0);
    const imageData = this.context.getImageData(0, 0, this.width, this.height);

    if (this.effectsChain.length > 0) {
      this.traverseData(imageData.data);
    }

    this.context.putImageData(imageData, 0, 0);

    if (this.showFrameRate) {
      this.context.font = '25px Arial';
      this.context.fillStyle = '#cc0066';
      this.context.fillText(`${this.fr.fps} FPS`, 10, 50);
    }
  }

  traverseData(data) {
    for (var i = 0; i < data.length; i += 4) {
      let rgbaIn = { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };

      // chain pixel effects here
      const rgbaOut = this.effectsChain.reduce((acc, effect) => {
        return this[effect](acc);
      }, rgbaIn);

      data[i] = rgbaOut.r;
      data[i + 1] = rgbaOut.g;
      data[i + 2] = rgbaOut.b;
      data[i + 3] = rgbaOut.a;
    }
  }

  invertColors(rgba) {
    const { r, g, b, a } = rgba;
    return { r: r ^ 255, g: g ^ 255, b: b ^ 255, a };
  }

  swapRGB(rgba) {
    const { r, g, b, a } = rgba;
    return { r: g, g: b, b: r, a };
  }
}

export default Effective;
