import PixelJammer from '../classes/PixelJammer/PixelJammer';
import Invert from '../classes/PixelJammer/Filters/Invert';
import SwapRedBlue from '../classes/PixelJammer/Filters/SwapRedBlue';

const MESSAGE_TYPE = require('./messageType');
const jammer = new PixelJammer();
jammer.showFrameRate();
jammer.addFilter(new Invert());
jammer.addFilter(new SwapRedBlue());

console.log(jammer);

self.addEventListener('message', event => {
  const data = event.data;
  switch (data.type) {
    case MESSAGE_TYPE.INIT:
      jammer.initCanvas(data.canvas);
      break;
    case MESSAGE_TYPE.DRAW:
      jammer.draw(data.imageBitmap);

      postMessage(MESSAGE_TYPE.DRAW, '');
      break;
    default:
      postMessage(MESSAGE_TYPE.ERROR, `Unrecognised event type '${event.data.type}'`);
  }
});

const postMessage = (type, payload) => {
  self.postMessage({ type, payload });
};
