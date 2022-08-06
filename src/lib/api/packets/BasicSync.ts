import * as app from '..';

export class BasicSync implements app.IPacketWriter {
  constructor(id: number) {
    this.id = id;
  }

  static create(stream: app.BinaryReader) {
    const id = stream.readUInt8();
    return new BasicSync(id);
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.BasicSync);
    stream.writeUInt8(this.id);
  }

  readonly id: number;
}
