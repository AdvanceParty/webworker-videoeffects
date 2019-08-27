import Effective from './Effective';

const MESSAGE_TYPE = require('./messageType');
const effective = new Effective();
// effective.addEffect('invertColors');
effective.addEffect('rotateColors');

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
