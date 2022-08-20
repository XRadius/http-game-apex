import * as app from '..';

export class EntityUpdateEntityMember {
  private constructor(
    readonly offset: number, 
    readonly buffer: DataView) {}

  static create(stream: app.BinaryReader) {
    const offset = stream.readVariableLength();
    const bufferSize = stream.readVariableLength();
    const buffer = stream.readBytes(bufferSize);
    return new EntityUpdateEntityMember(offset, buffer);
  }
}
