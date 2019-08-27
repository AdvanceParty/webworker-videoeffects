require('../css/styles.css');
const matrxVid = require('../vids/matrix.webm');

const worker = new Worker('canvas.worker.js');
const offscreen = document.querySelector('#canvas').transferControlToOffscreen();
const video = document.createElement('video');
const stream = video.captureStream();

let imageCapture, track;

video.loop = true;
video.src = matrxVid;
video.oncanplay = evt => onVideoReady(evt);
video.onplay = () => draw();

const onVideoReady = evt => {
  [track] = stream.getVideoTracks();
  imageCapture = new ImageCapture(track);
  worker.postMessage({ offscreen }, [offscreen]);
  evt.target.play();
};

const draw = async () => {
  const imageBitmap = await imageCapture.grabFrame();
  worker.postMessage({ imageBitmap }, [imageBitmap]);
  requestAnimationFrame(draw);
};
