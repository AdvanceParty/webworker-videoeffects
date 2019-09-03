import Filter from '../Filter';

class Invert extends Filter {
  static process(px) {
    const { r, g, b } = Filter.b32ToRGB(px);
    return 0xff000000 | (b << 16) | (g << 8) | r;
  }

  constructor() {
    return Invert.process;
  }
}
export default Invert;
