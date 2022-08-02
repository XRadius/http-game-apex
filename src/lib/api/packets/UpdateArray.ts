import * as app from '..';

export class UpdateArray {
  private constructor(entities: Array<app.UpdateEntity>) {
    this.entities = entities;
  }

  static create(stream: app.BinaryReader) {
    const members = stream.readEntityArray(app.UpdateEntity.create);
    return new UpdateArray(members);
  }

  readonly entities: Array<app.UpdateEntity>;
}
