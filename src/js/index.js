// import assets and modules
require('../css/styles.css');
const MESSAGE_TYPE = require('./worker/messageType');
const worker = new Worker('./worker/canvas.worker.js');
const videoSrc = require('../../sampleVids/movie.mp4');

// create elements for UI
const canvas = document.createElement('canvas');
let video, imageCapture, track;

const main = async () => {
  video = await initVideo(videoSrc);
  initStream();
  initWorker(canvas);

  document.body.appendChild(video);
  document.body.appendChild(canvas);
};

const initVideo = videoSrc => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.loop = true;
    video.onplay = () => draw();
    video.onclick = evt => (video.paused ? video.play() : video.pause());
    try {
      video.addEventListener('canplay', () => resolve(video));
      video.src = videoSrc;
    } catch (e) {
      reject('Failed to load video');
    }
  });
};

const initStream = () => {
  const stream = video.captureStream();
  [track] = stream.getVideoTracks();
  imageCapture = new ImageCapture(track);
};

const draw = async () => {
  if (video.paused) return;
  const imageBitmap = await imageCapture.grabFrame();
  worker.postMessage({ imageBitmap, type: MESSAGE_TYPE.DRAW }, [imageBitmap]);
};

const initWorker = () => {
  // handoff canvas rendering to the web worker
  // processing video effects on their own dedicated thread ensures that
  // even the main application won't become sluggish or unresponsive, even if the
  // CPU can't render the video and full frame rate.
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ canvas: offscreen, type: MESSAGE_TYPE.INIT }, [offscreen]);

  // respond to events posted back to the main thread
  // from the web worker thread
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
