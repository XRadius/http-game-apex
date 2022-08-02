import * as app from '..';

export class CreateEntityMember implements app.IPacketWriter {
  constructor(offset: number, interval: number, size: number) {
    this.offset = offset;
    this.interval = interval;
    this.size = size;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt16(this.offset);
    stream.writeUInt16(this.interval);
    stream.writeUInt16(this.size);
  }

  readonly offset: number;
  readonly interval: number;
  readonly size: number;
}
