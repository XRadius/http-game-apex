export class BinaryReader {
  private readonly buffer: DataView;
  private offset: number;

  constructor(buffer: DataView) {
    this.buffer = buffer;
    this.offset = 0;
  }

  hasBytes() {
    return this.offset < this.buffer.byteLength - this.buffer.byteOffset;
  }

  readByteArray() {
    const size = this.readUInt16();
    const buffer = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.offset, size);
    this.offset += size;
    return buffer;
  }

  readEntityArray<T>(factory: (stream: BinaryReader) => T) {
    const size = this.readUInt16();
    const items = [];
    for (let i = 0; i < size; i++) items[i] = factory(this);
    return items;
  }

  readUInt8() {
    const result = this.buffer.getUint8(this.offset);
    this.offset += 1;
    return result;
  }

  readUInt16() {
    const result = this.buffer.getUint16(this.offset, true);
    this.offset += 2;
    return result;
  }

  readUInt64() {
    const result = this.buffer.getBigUint64(this.offset, true);
    this.offset += 8;
    return result;
  }
}
