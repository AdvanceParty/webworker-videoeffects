const MESSAGE_TYPE = require('./messageType');

let canvas;
let context;

addEventListener('message', event => {
  switch (event.data.type) {
    case MESSAGE_TYPE.READY:
      canvas = event.data.offscreen;
      context = canvas.getContext('2d');
      break;
    case MESSAGE_TYPE.DRAW:
      if (context) {
        context.drawImage(event.data.imageBitmap, 0, 0);
      }
      break;
    default:
      postMessage(MESSAGE_TYPE.ERROR, `Unrecognised event type '${event.data.type}'`);
  }
});

const postMessage = (type, payload) => {
  self.postMessage({ type, payload });
};
