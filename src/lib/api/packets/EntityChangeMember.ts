import * as app from '..';

export class EntityChangeMember implements app.IPacketWriter {
  constructor(
    readonly offset: number,
    readonly buffer: DataView,
    readonly deltas?: Array<app.EntityChangeMemberDelta>) {}

  write(stream: app.BinaryWriter) {
    stream.writeVariableLength(this.offset);
    if (this.deltas) {
      stream.writeVariableLength(this.deltas.length);
      this.deltas.forEach(x => x.write(stream));
    } else {
      stream.writeUInt8(0);
      stream.writeVariableLength(this.buffer.byteLength);
      stream.writeBytes(this.buffer);
    }
  }
}
