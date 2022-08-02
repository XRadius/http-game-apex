import * as app from '..';

export class UpdateEntity {
  private constructor(address: bigint, members: Array<app.UpdateEntityMember>) {
    this.address = address;
    this.members = members;
  }

  static create(stream: app.BinaryReader) {
    const address = stream.readUInt64();
    const members = stream.readEntityArray(app.UpdateEntityMember.create);
    return new UpdateEntity(address, members);
  }

  readonly address: bigint;
  readonly members: Array<app.UpdateEntityMember>;
}
