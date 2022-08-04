import * as app from '..';

export class EntityUpdate {
  private constructor(entities: Array<app.EntityUpdateEntity>) {
    this.entities = entities;
  }

  static create(stream: app.BinaryReader) {
    const members = stream.readKnownEntityArray(app.EntityUpdateEntity.create);
    return new EntityUpdate(members);
  }

  readonly entities: Array<app.EntityUpdateEntity>;
}
