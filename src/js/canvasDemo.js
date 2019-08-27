const slowFunc = require('./slowFunc');
const btn_mainThread = document.querySelector('#btn_mainThread');
const btn_worker = document.querySelector('#btn_worker');

const worker = new Worker('canvas.worker.js');
const offscreen = document.querySelector('#canvas').transferControlToOffscreen();

btn_mainThread.onclick = function(evt) {
  const result = slowFunc();
  showResult('main thread', result);
};

btn_worker.onclick = function(evt) {
  worker.postMessage(['slowFunc']);
  // worker.postMessage({ canvas: offscreen }, [offscreen]);
  // const result = slowFunc();
  // console.log(`Main Thread result ${result}.`);
};

worker.onmessage = function(evt) {
  const { data } = evt;
  if (data.result) {
    showResult('worker thread', data.result);
  }
};

const showResult = (thread, result) => {
  console.log(`${thread} result: ${result}.`);
};
