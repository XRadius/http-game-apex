import * as app from '..';

export class EntityChange implements app.IPacketWriter {
  constructor(
    readonly id: number,
    readonly changes: Array<app.EntityChangeMember>) {}

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.EntityChange);
    stream.writeVariableLength(this.id);
    stream.writeVariableLength(this.changes.length);
    this.changes.forEach(x => x.write(stream));
  }
}
