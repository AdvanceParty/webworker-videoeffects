require('../css/styles.css');

const MESSAGE_TYPE = require('./messageType');
const videoSrc = require('../vids/movie.mp4');
const worker = new Worker('canvas.worker.js');
const canvas = document.createElement('canvas');
const video = document.createElement('video');
const stream = video.captureStream();
let imageCapture, track;

const main = () => {
  initWorker(canvas);

  video.src = videoSrc;
  video.loop = true;
  video.addEventListener('canplay', evt => onVideoReady(evt));
  video.onplay = () => draw();
  video.onclick = evt => (video.paused ? video.play() : video.pause());

  document.body.appendChild(video);
  document.body.appendChild(canvas);
};

const onVideoReady = evt => {
  [track] = stream.getVideoTracks();
  imageCapture = new ImageCapture(track);
};

const draw = async () => {
  try {
    // ToDo: throws "Uncaught in promise" on first frame
    // when restarting a paused video. Try...catch gets over the issue for now
    // but a proper fix should be implemented at some point
    const imageBitmap = await imageCapture.grabFrame();
    worker.postMessage({ imageBitmap, type: MESSAGE_TYPE.DRAW }, [imageBitmap]);
  } catch (e) {}
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
