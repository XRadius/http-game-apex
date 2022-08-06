import * as app from '..';

export class EntityChangeMember implements app.IPacketWriter {
  constructor(offset: number, buffer: DataView) {
    this.offset = offset;
    this.buffer = buffer;
  }

  write(stream: app.BinaryWriter) {
    stream.writeVariableLength(this.offset);
    stream.writeVariableLength(this.buffer.byteLength);
    stream.writeBytes(this.buffer);
  }

  readonly offset: number;
  readonly buffer: DataView;
}
