export class Vector {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number) {}

  static from(buffer: DataView) {
    const x = buffer.getFloat32(0, true);
    const y = buffer.getFloat32(4, true);
    const z = buffer.getFloat32(8, true);
    return new Vector(x, y, z);
  }
  
  toString() {
    return `(${this.x.toFixed()},${this.y.toFixed()},${this.z.toFixed()})`;
  }
}
