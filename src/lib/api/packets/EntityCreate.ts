import * as app from '..';

export class EntityCreate implements app.IPacketWriter {
  constructor(address: bigint, members: Array<app.EntityCreateMember>) {
    this.address = address;
    this.members = members;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt64(this.address);
    stream.writeKnownEntityArray(this.members);
  }

  readonly address: bigint;
  readonly members: Array<app.EntityCreateMember>;
}
