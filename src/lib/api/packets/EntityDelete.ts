import * as app from '..';

export class EntityDelete implements app.IPacketWriter {
  constructor(id: number) {
    this.id = id;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.EntityDelete);
    stream.writeVariableLength(this.id);
  }

  readonly id: number;
}
