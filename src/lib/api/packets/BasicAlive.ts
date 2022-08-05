import * as app from '..';

export class BasicAlive implements app.IPacketWriter {
  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.BasicAlive);
  }
}
