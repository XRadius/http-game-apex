import * as app from '..';

export class EntityChange implements app.IPacketWriter {
  constructor(address: bigint, changes: Array<app.EntityChangeMember>) {
    this.address = address;
    this.changes = changes;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.EntityChange);
    stream.writeUInt64(this.address);
    stream.writeVariableLength(this.changes.length);
    this.changes.forEach(x => x.write(stream));
  }

  readonly address: bigint;
  readonly changes: Array<app.EntityChangeMember>;
}
