// ----------- Base Class for effects
class Effect {
  static b32ToRGB(b32) {
    return {
      r: ((b32 >> 0) & 0xff) ^ 255,
      g: ((b32 >> 8) & 0xff) ^ 255,
      b: ((b32 >> 16) & 0xff) ^ 255,
    };
  }

  static process(px) {
    return px;
  }

  constructor() {
    return Effect.process;
  }
}

export class Invert extends Effect {
  static process(px) {
    const { r, g, b } = Effect.b32ToRGB(px);
    return 0xff000000 | (b << 16) | (g << 8) | r;
  }

  constructor() {
    return Invert.process;
  }
}

export class SwapRedGreen extends Effect {
  static process(px) {
    const { r, g, b } = Effect.b32ToRGB(px);
    return 0xff000000 | (b << 16) | (r << 8) | g;
  }
  constructor() {
    return SwapRedGreen.process;
  }
}
