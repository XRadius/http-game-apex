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

  readBytes(size: number) {
    const buffer = new DataView(new ArrayBuffer(size));
    for (let i = 0; i < size; i++) buffer.setUint8(i, this.readUInt8());
    return buffer;
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
