import * as app from '..';

export class BinaryWriter {
  private readonly buffer: DataView;
  private offset: number;

  constructor() {
    this.buffer = new DataView(new ArrayBuffer(8192));
    this.offset = 0;
  }

  hasBytes() {
    return Boolean(this.offset);
  }

  writeByteArray(value: DataView) {
    this.writeUInt16(value.byteLength);
    for (let i = 0; i < value.byteLength; i++) {
      this.writeUInt8(value.getInt8(i));
    }
  }

  writeEntityArray(values: Array<app.IPacketWriter>) {
    this.writeUInt16(values.length);
    values.forEach(x => x.write(this));
  }

  writeUInt8(value: number) {
    this.buffer.setUint8(this.offset, value);
    this.offset += 1;
  }

  writeUInt16(value: number) {
    this.buffer.setUint16(this.offset, value, true);
    this.offset += 2;
  }

  writeUInt64(value: bigint) {
    this.buffer.setBigUint64(this.offset, value, true);
    this.offset += 8;
  }
  
  toBuffer() {
    return new DataView(this.buffer.buffer, 0, this.offset);
  }
}
