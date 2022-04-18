import * as app from '..';

export class Color {
  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number) {}

  static from(buffer: DataView) {
    const r = buffer.getFloat32(0, true);
    const g = buffer.getFloat32(4, true);
    const b = buffer.getFloat32(8, true);
    return new Color(r, g, b);
  }

  static parse(input: string, scale = 255) {
    const m = input.match(/^#?([0-9A-Z]{2})([0-9A-Z]{2})([0-9A-Z]{2})$/i);
    const r = parseInt(m![1], 16) / 255 * scale;
    const g = parseInt(m![2], 16) / 255 * scale;
    const b = parseInt(m![3], 16) / 255 * scale;
    return new Color(r, g, b);
  }

  toBuffer() {
    const buffer = new DataView(new ArrayBuffer(0xC));
    buffer.setFloat32(0, this.r, true);
    buffer.setFloat32(4, this.g, true);
    buffer.setFloat32(8, this.b, true);
    return buffer;
  }

  toString() {
    return app.serialize(this);
  }
}
