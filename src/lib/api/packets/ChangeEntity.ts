import * as app from '..';

export class ChangeEntity implements app.IPacketWriter {
  constructor(address: bigint, changes: Array<app.ChangeEntityMember>) {
    this.address = address;
    this.changes = changes;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt64(this.address);
    stream.writeEntityArray(this.changes);
  }

  readonly address: bigint;
  readonly changes: Array<app.ChangeEntityMember>;
}
