import * as app from '..';

export class EntityGlow {
  constructor(
    readonly bodyStyle: number,
    readonly borderStyle: number,
    readonly borderSize: number,
    readonly opacity: number) {}

  static from(buffer: DataView) {
    const bodyStyle = buffer.getUint8(0);
    const borderStyle = buffer.getUint8(1);
    const borderSize = buffer.getUint8(2);
    const opacity = buffer.getUint8(3);
    return new EntityGlow(bodyStyle, borderStyle, borderSize, opacity);
  }

  toBuffer() {
    const buffer = new DataView(new ArrayBuffer(0x4));
    buffer.setUint8(0, this.bodyStyle);
    buffer.setUint8(1, this.borderStyle);
    buffer.setUint8(2, this.borderSize);
    buffer.setUint8(3, this.opacity);
    return buffer;
  }
  
  toString() {
    return app.serialize(this);
  }
}
