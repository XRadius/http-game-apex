import * as app from '..';

export class EntityDelete implements app.IPacketWriter {
  constructor(
    readonly id: number) {}

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.EntityDelete);
    stream.writeVariableLength(this.id);
  }
}
