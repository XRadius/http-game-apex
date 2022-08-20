import * as app from '..';

export class BasicSync implements app.IPacketWriter {
  constructor(
    readonly id: number) {}

  static create(stream: app.BinaryReader) {
    const id = stream.readUInt8();
    return new BasicSync(id);
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.BasicSync);
    stream.writeUInt8(this.id);
  }
}
