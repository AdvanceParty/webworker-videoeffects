# Video Effects - Performance Testing

- Testing methods for creating performant video effects.
- Effects are applied in a worker thread using OffscreenCanvas to ensure slow effects don't interfere with the main thread, so the application remains responsive.

---

## Dev

Code is bundled with ParcelJS, with a local server available for development.

#### Get a test video first

mp4|mov|webm files in the /sampleVids directory are excluded from version control because **big files**.
Before running the app in your dev environment, do one of two things:

- Drop a video named _movie.mp4_ into /sampleVidsa directory; or
- change the `const videoSrc = require('../../sampleVids/movie.mp4');` line in _index.js_

#### Then it's business as usual:

From project root directory:

- Install node dependencies with `npm i`
- Start the server with `npm start`
- Point your browser to http://localhost:1234

---

## Architecture

> Work In Progress. More complete documentation is coming soon.

- index.js :: starts the demo application, creates HTML elements, hands canvas processing off to web worker
- worker/canvas.worker.js :: Runs the effects renderer (pixel jammer) as an OffCanvas object via a web worker. Triggers the effects renderer to redraw on each frame.
- PixelJammer :: Iterates through every pixel in an image and applies a pipeline of filters to transform each pixel's value. This demo connects it to a video src and updates at the highest framerate it can manage, but there's no reason why the class can't be used directly on any kind of image that can be rendered to canvas.
- Filter :: Base class for pixel transformation effects. Extend this class to add your own pixel mutation effects. See examples in classes/PixelJammer/Filters.

---

## Build

`npm run build`
