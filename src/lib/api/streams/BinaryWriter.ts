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

  writeBytes(value: DataView) {
    for (let i = 0; i < value.byteLength; i++) {
      this.writeUInt8(value.getUint8(i));
    }
  }

  writeUInt8(value: number) {
    this.prepare(1);
    this.buffer.setUint8(this.offset, value);
    this.offset += 1;
  }

  writeUInt64(value: bigint) {
    this.prepare(8);
    this.buffer.setBigUint64(this.offset, value, true);
    this.offset += 8;
  }
  
  writeVariableLength(value: number) {
    let more = true;
    while (more) {
      let chunk = value & 0x7F;
      value >>= 7;
      more = value != 0;
      chunk |= more ? 0x80 : 0;
      this.writeUInt8(chunk);
    }
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
