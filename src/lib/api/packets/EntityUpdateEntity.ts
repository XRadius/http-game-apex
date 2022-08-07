import * as app from '..';

export class EntityUpdateEntity {
  private constructor(id: number, members: Array<app.EntityUpdateEntityMember>) {
    this.id = id;
    this.members = members;
  }

  static create(stream: app.BinaryReader) {
    const id = stream.readVariableLength();
    const membersSize = stream.readVariableLength();
    const members = Array(membersSize).fill(0).map(() => app.EntityUpdateEntityMember.create(stream));
    return new EntityUpdateEntity(id, members);
  }

  readonly id: number;
  readonly members: Array<app.EntityUpdateEntityMember>;
}
