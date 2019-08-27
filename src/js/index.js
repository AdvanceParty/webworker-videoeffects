require('../css/styles.css');
const MESSAGE_TYPE = require('./messageType');
const videoSrc = require('../vids/matrix.webm');
const worker = new Worker('canvas.worker.js');

const offscreen = document.querySelector('#canvas').transferControlToOffscreen();
const video = document.createElement('video');
const stream = video.captureStream();

let imageCapture, track;

video.loop = true;
video.src = videoSrc;
video.oncanplay = evt => onVideoReady(evt);
video.onplay = () => draw();

const onVideoReady = evt => {
  [track] = stream.getVideoTracks();
  imageCapture = new ImageCapture(track);

  worker.postMessage({ offscreen, type: MESSAGE_TYPE.READY }, [offscreen]);
  evt.target.play();
};

const draw = async () => {
  const imageBitmap = await imageCapture.grabFrame();
  worker.postMessage({ imageBitmap, type: MESSAGE_TYPE.DRAW }, [imageBitmap]);
  requestAnimationFrame(draw);
};

worker.onmessage = evt => {
  const { type, payload } = evt.data;
  switch (type) {
    case MESSAGE_TYPE.ERROR:
      console.log(`[Worker Error] ${payload}`);
      break;
    default:
      console.log(type, payload);
  }
};
