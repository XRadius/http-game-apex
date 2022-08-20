import * as app from '..';

export class EntityCreateMember implements app.IPacketWriter {
  constructor(
    readonly offset: number,
    readonly interval: number,
    readonly size: number) {}

  write(stream: app.BinaryWriter) {
    stream.writeVariableLength(this.offset);
    stream.writeVariableLength(this.interval);
    stream.writeVariableLength(this.size);
  }
}
