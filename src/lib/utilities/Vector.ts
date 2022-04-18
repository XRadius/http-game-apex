import * as app from '..';

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

  toBuffer() {
    const buffer = new DataView(new ArrayBuffer(0xC));
    buffer.setFloat32(0, this.x, true);
    buffer.setFloat32(4, this.y, true);
    buffer.setFloat32(8, this.z, true);
    return buffer;
  }
  
  toString() {
    return app.serialize(this);
  }
}
