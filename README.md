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

## Build

`npm run build`
