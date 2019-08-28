# Video Effects - Performance Testing

- Testing methods for creating performant video effects.
- Effects are applied in a worker thread using OffscreenCanvas to ensure slow effects don't interfere with the main thread, so the application remains responsive.

## Install and Run

Code is bundled with ParcelJS, with a local server available for development.

##### Development

- Clone the repo
- cd into the root directory
- `npm i`
- `npm start`

##### Build

`npm run build`
