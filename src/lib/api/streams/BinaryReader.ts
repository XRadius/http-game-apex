export class BinaryReader {
  private readonly buffer: DataView;
  private offset: number;

  constructor(buffer: ArrayBuffer) {
    this.buffer = new DataView(buffer);
    this.offset = 0;
  }

  hasBytes() {
    return this.offset < this.buffer.byteLength - this.buffer.byteOffset;
  }

  readBytes(size: number) {
    const result = new DataView(this.buffer.buffer, this.offset, size);
    this.offset += size;
    return result;
  }
  
  readUInt8() {
    const result = this.buffer.getUint8(this.offset);
    this.offset += 1;
    return result;
  }

  readUInt64() {
    const result = this.buffer.getBigUint64(this.offset, true);
    this.offset += 8;
    return result;
  }

  readVariableLength() {
    var more = true;
    var value = 0;
    var shift = 0;
    while (more) {
      var b = this.readUInt8();
      more = (b & 0x80) !== 0;
      value |= (b & 0x7F) << shift;
      shift += 7;
    }
    return value;
  }
}
