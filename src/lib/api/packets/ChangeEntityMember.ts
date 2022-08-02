import * as app from '..';

export class ChangeEntityMember implements app.IPacketWriter {
  constructor(offset: number, buffer: DataView) {
    this.offset = offset;
    this.buffer = buffer;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt16(this.offset);
    stream.writeByteArray(this.buffer);
  }

  readonly offset: number;
  readonly buffer: DataView;
}
