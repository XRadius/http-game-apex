export class Vector {
  constructor(
    private readonly buffer: DataView) {}

  get x() {
    return this.buffer.getFloat32(0, true);
  }

  get y() {
    return this.buffer.getFloat32(4, true);
  }

  get z() {
    return this.buffer.getFloat32(8, true);
  }

  toString() {
    return `(${this.x.toFixed()},${this.y.toFixed()},${this.z.toFixed()})`;
  }
}
