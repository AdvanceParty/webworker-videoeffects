let canvas;
let context;

addEventListener('message', event => {
  if (event.data.offscreen) {
    canvas = event.data.offscreen;
    context = canvas.getContext('2d');
  } else if (event.data.imageBitmap && context) {
    context.drawImage(event.data.imageBitmap, 0, 0);
  }
});
