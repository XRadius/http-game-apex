import * as app from '..';

export class EntityCreate implements app.IPacketWriter {
  constructor(id: number, address: bigint, members: Array<app.EntityCreateMember>) {
    this.id = id;
    this.address = address;
    this.members = members;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt8(app.PacketType.EntityCreate);
    stream.writeVariableLength(this.id);
    stream.writeUInt64(this.address);
    stream.writeVariableLength(this.members.length);
    this.members.forEach(x => x.write(stream));
  }

  readonly id: number;
  readonly address: bigint;
  readonly members: Array<app.EntityCreateMember>;
}
