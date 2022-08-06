import * as app from '..';

export class EntityUpdate {
  private constructor(entities: Array<app.EntityUpdateEntity>) {
    this.entities = entities;
  }

  static create(stream: app.BinaryReader) {
    const membersSize = stream.readVariableLength();
    const members = Array(membersSize).fill(0).map(() => app.EntityUpdateEntity.create(stream));
    return new EntityUpdate(members);
  }

  readonly entities: Array<app.EntityUpdateEntity>;
}
