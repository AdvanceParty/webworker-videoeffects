// ----------- Base Class for effects
class Filter {
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
    return Filter.process;
  }
}

export default Filter;
