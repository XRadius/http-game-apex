import * as app from '..';

export class EntityUpdateEntity {
  private constructor(id: number, members: Array<app.EntityUpdateEntityMember>) {
    this.id = id;
    this.members = members;
  }

  static create(stream: app.BinaryReader) {
    const id = stream.readVariableLength();
    const membersSize = stream.readVariableLength();
    const members = process(stream, membersSize);
    return new EntityUpdateEntity(id, members);
  }

  readonly id: number;
  readonly members: Array<app.EntityUpdateEntityMember>;
}

function process(stream: app.BinaryReader, size: number) {
  const result = new Array<app.EntityUpdateEntityMember>(size);
  for (let i = 0; i < size; i++) result[i] = app.EntityUpdateEntityMember.create(stream);
  return result;
}
