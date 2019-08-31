class Effect {
  static process(px) {
    return px;
  }

  constructor() {
    return Effect.process;
  }
}

export class Invert extends Effect {
  static process(px) {
    const r = ((px >> 0) & 0xff) ^ 255;
    const g = ((px >> 8) & 0xff) ^ 255;
    const b = ((px >> 16) & 0xff) ^ 255;
    return 0xff000000 | (b << 16) | (g << 8) | r;
  }
  constructor() {
    return Invert.process;
  }
}

export class Invert2 extends Effect {
  static process(px) {
    const r = ((px >> 0) & 0xff) ^ 255;
    const g = ((px >> 8) & 0xff) ^ 255;
    const b = ((px >> 16) & 0xff) ^ 255;
    return 0xff000000 | (b << 16) | (g << 8) | r;
  }
  constructor() {
    return Invert2.process;
  }
}
