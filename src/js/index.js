require('../css/styles.css');

const MESSAGE_TYPE = require('./messageType');
const videoSrc = require('../vids/gravity.mp4');
const worker = new Worker('canvas.worker.js');
const canvas = document.createElement('canvas');
const video = document.createElement('video');
const stream = video.captureStream();
let imageCapture, track;

const main = () => {
  initWorker(canvas);

  video.loop = true;
  video.src = videoSrc;
  video.oncanplay = evt => onVideoReady(evt);
  video.onplay = () => draw();

  document.body.appendChild(canvas);
  document.body.appendChild(video);
};

const onVideoReady = evt => {
  [track] = stream.getVideoTracks();
  imageCapture = new ImageCapture(track);
  evt.target.play();
};

const draw = async () => {
  const imageBitmap = await imageCapture.grabFrame();
  worker.postMessage({ imageBitmap, type: MESSAGE_TYPE.DRAW }, [imageBitmap]);
};

const initWorker = () => {
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ canvas: offscreen, type: MESSAGE_TYPE.INIT }, [offscreen]);

  worker.onmessage = evt => {
    const { type, payload } = evt.data;
    switch (type) {
      case MESSAGE_TYPE.DRAW:
        draw();
        break;
      case MESSAGE_TYPE.ERROR:
        console.log(`[Worker Error] ${payload}`);
        break;
      default:
        console.log(type, payload);
    }
  };
};

main();
