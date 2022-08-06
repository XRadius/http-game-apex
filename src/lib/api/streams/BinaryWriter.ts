import * as app from '..';

export class BinaryWriter {
  private buffer: DataView;
  private offset: number;

  constructor() {
    this.buffer = new DataView(new ArrayBuffer(1024));
    this.offset = 0;
  }

  hasBytes() {
    return Boolean(this.offset);
  }

  writeKnownByteArray(value: DataView) {
    this.writeUInt16(value.byteLength);
    for (let i = 0; i < value.byteLength; i++) {
      this.writeUInt8(value.getInt8(i));
    }
  }

  writeKnownEntityArray(values: Array<app.IPacketWriter>) {
    this.writeUInt16(values.length);
    values.forEach(x => x.write(this));
  }

  writeUInt8(value: number) {
    this.prepare(1);
    this.buffer.setUint8(this.offset, value);
    this.offset += 1;
  }

  writeUInt16(value: number) {
    this.prepare(2);
    this.buffer.setUint16(this.offset, value, true);
    this.offset += 2;
  }

  writeUInt64(value: bigint) {
    this.prepare(8);
    this.buffer.setBigUint64(this.offset, value, true);
    this.offset += 8;
  }
  
  toBuffer() {
    return new DataView(this.buffer.buffer, 0, this.offset);
  }

  private prepare(count: number) {
    while (this.offset + count > this.buffer.byteLength) {
      const result = new DataView(new ArrayBuffer(this.buffer.byteLength * 2));
      for (let i = 0; i < this.offset; i++) result.setUint8(i, this.buffer.getUint8(i));
      this.buffer = result;
    }
  }
}
