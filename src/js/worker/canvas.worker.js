import Effective from '../classes/Effective';
import { Invert, SwapRedGreen } from '../classes/Effective/Effects';

const MESSAGE_TYPE = require('./messageType');
const effective = new Effective();
effective.showFrameRate();
effective.addEffect(new Invert());
effective.addEffect(new SwapRedGreen());

self.addEventListener('message', event => {
  const data = event.data;
  switch (data.type) {
    case MESSAGE_TYPE.INIT:
      effective.initCanvas(data.canvas);
      break;
    case MESSAGE_TYPE.DRAW:
      effective.draw(data.imageBitmap);

      postMessage(MESSAGE_TYPE.DRAW, '');
      break;
    default:
      postMessage(MESSAGE_TYPE.ERROR, `Unrecognised event type '${event.data.type}'`);
  }
});

const postMessage = (type, payload) => {
  self.postMessage({ type, payload });
};
