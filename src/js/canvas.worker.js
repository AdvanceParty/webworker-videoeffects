const slowFunc = require('./slowFunc');

onmessage = function(evt) {
  const result = slowFunc();
  self.postMessage({ result });
  // self.postMessage({ canvas }, [canvas]);
};

// const { canvas } = evt.data;
//   context = canvas.getContext('2d');
//   console.log(context);
//   context.beginPath();
//   context.lineWidth = 1;
//   context.strokeStyle = '#ffffff';
//   context.rect(10, 10, 20, 20);
//   context.stroke();
