// **** See notes at bottom of file re: BufferArrays

import FrameRater from '../FrameRater';
import { pipe } from '../../utils/compositionTools';

class Effective {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this._effects = [];
  }

  showFrameRate() {
    this.showFrameRate = true;
    this.fr = this.fr ? this.fr : new FrameRater();
  }

  addEffect(effect) {
    this._effects.push(effect);
    this.effectsPipe = pipe(...this._effects);
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

    if (this._effects.length > 0) {
      this.context.drawImage(imageBitmap, 0, 0);
      const imageData = this.context.getImageData(0, 0, this.width, this.height);
      this.traversePixels(imageData.data.buffer, this.width, this.height);
      this.context.putImageData(imageData, 0, 0);
    }

    if (this.showFrameRate) {
      this.context.font = '15px Arial';
      this.context.fillStyle = '#cc0066';
      this.context.fillText(`${this.fr.fps} FPS`, 10, 50);
    }
  }

  traversePixels(buffer, width, height) {
    const sourceBuffer32 = new Uint32Array(buffer);
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        const pos = x + y * width;
        sourceBuffer32[pos] = this.effectsPipe(sourceBuffer32[pos]);
      }
    }
  }
}

export default Effective;

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::: IMAGE DATA AND BUFFERS ::::::::::::::::::

// -- Image Data as bytes buffer --
// imageData.data.buffer returns the image data as an ArrayBuffer
// An ArrayBuffer is a refence to an area of memory which contains binary data.
// The area of memory that an ArrayBuffer references is fixed-length and contiguous.
// ArrayBuffers are NOT Arrays! (I know, right?).
// • You can't address their content directly (eg: ArrayBuffer[n] won't work)
// • They aren't iterable
// • Their length can't be chjanged

// Use a 'view' object to read/write an ArrayBuffer's content.
//  • eg: Uint8Unsigned, Uint16Unsigned, Uint32Unsigned
// View objects don't hold any data of their own. They are just a tool for working with data in ArrayBuffers
// This allows us to read the content of ArrayBuffers as our choice of 8bit, 16bit, 32bit (etc) data.

// -- Pixel Values from the buffer --
// Each pixel is stored as a block of 4 sequential bytes.
// 1 pixel = 4 bytes of data = buffer[n]...buffer[n+3];
//    • buffer[0] -> buffer[3] = first pixel
//    • buffer[4] -> buffer[7] = second pixel
//
// Each byte in a pixel represents one of its red, green, blue or alpha values.
// These are always in the same order:
//    • 1st byte: red value
//    • 2nd byte: green value
//    • 3rd byte: blue value
//    • 4th byte: alpha value

// four bytes = one 32-bit unsigned int
// so we view the buffer with a Uint32Array

// ---- Further Reading ----
// bit.ly/ArrayBuffers-in-JS
