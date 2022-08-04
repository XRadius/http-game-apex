import * as app from '..';

export class EntityUpdateEntity {
  private constructor(address: bigint, members: Array<app.EntityUpdateEntityMember>) {
    this.address = address;
    this.members = members;
  }

  static create(stream: app.BinaryReader) {
    const address = stream.readUInt64();
    const members = stream.readKnownEntityArray(app.EntityUpdateEntityMember.create);
    return new EntityUpdateEntity(address, members);
  }

  readonly address: bigint;
  readonly members: Array<app.EntityUpdateEntityMember>;
}
