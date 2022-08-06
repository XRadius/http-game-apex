import * as app from '..';

export class EntityCreateMember implements app.IPacketWriter {
  constructor(offset: number, interval: number, size: number) {
    this.offset = offset;
    this.interval = interval;
    this.size = size;
  }

  write(stream: app.BinaryWriter) {
    stream.writeVariableLength(this.offset);
    stream.writeVariableLength(this.interval);
    stream.writeVariableLength(this.size);
  }

  readonly offset: number;
  readonly interval: number;
  readonly size: number;
}
