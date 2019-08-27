require('../css/styles.css');

const slowFunc = require('./slowFunc');

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const sq = document.querySelector('#square');

const worker = new Worker('canvas.worker.js');

// animate the square to show
rotateSquare(1);

// event handlers for buttons
btn1.onclick = evt => log('main thread', slowFunc());
btn2.onclick = evt => worker.postMessage(['slowFunc']);

worker.onmessage = function(evt) {
  evt.data.result ? log('worker', evt.data.result) : null;
};

const log = (thread, result) => {
  console.log(`${thread} result: ${result}.`);
};

// use js to update an animation to show comparison between
// blocking the main thread and using a web worker
function rotateSquare(value) {
  const r = value > 360 ? 0 : value;
  sq.style.transform = `rotate(${r}deg)`;
  requestAnimationFrame(value => rotateSquare(r + 1));
}
