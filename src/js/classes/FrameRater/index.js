export class FrameRater {
  constructor() {
    this._times = [];
    this._fps;
    this._update();
  }

  get fps() {
    return this._fps;
  }

  _update() {
    requestAnimationFrame(() => {
      const now = performance.now();
      while (this._times.length > 0 && this._times[0] <= now - 1000) {
        this._times.shift();
      }
      this._times.push(now);
      this._fps = this._times.length;
      this._update();
    });
  }
}

export default FrameRater;
