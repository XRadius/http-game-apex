import * as app from '..';

export class CreateEntity implements app.IPacketWriter {
  constructor(address: bigint, members: Array<app.CreateEntityMember>) {
    this.address = address;
    this.members = members;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt64(this.address);
    stream.writeEntityArray(this.members);
  }

  readonly address: bigint;
  readonly members: Array<app.CreateEntityMember>;
}
