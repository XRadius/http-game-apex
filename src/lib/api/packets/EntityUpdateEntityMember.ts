import * as app from '..';

export class EntityUpdateEntityMember {
  private constructor(offset: number, buffer: DataView) {
    this.offset = offset;
    this.buffer = buffer;
  }

  static create(stream: app.BinaryReader) {
    const offset = stream.readUInt16();
    const buffer = stream.readKnownByteArray();
    return new EntityUpdateEntityMember(offset, buffer);
  }

  readonly offset: number;
  readonly buffer: DataView;
}
