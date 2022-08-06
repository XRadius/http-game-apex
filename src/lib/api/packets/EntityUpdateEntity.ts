import * as app from '..';

export class EntityUpdateEntity {
  private constructor(address: bigint, members: Array<app.EntityUpdateEntityMember>) {
    this.address = address;
    this.members = members;
  }

  static create(stream: app.BinaryReader) {
    const address = stream.readUInt64();
    const membersSize = stream.readVariableLength();
    const members = Array(membersSize).fill(0).map(() => app.EntityUpdateEntityMember.create(stream));
    return new EntityUpdateEntity(address, members);
  }

  readonly address: bigint;
  readonly members: Array<app.EntityUpdateEntityMember>;
}
