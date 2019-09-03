import Filter from '../Filter';

class SwapRedBlue extends Filter {
  static process(px) {
    const { r, g, b } = Filter.b32ToRGB(px);
    return 0xff000000 | (b << 16) | (r << 8) | g;
  }

  constructor() {
    return SwapRedBlue.process;
  }
}

export default SwapRedBlue;
