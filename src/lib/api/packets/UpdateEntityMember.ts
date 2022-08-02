import * as app from '..';

export class UpdateEntityMember {
  private constructor(offset: number, buffer: DataView) {
    this.offset = offset;
    this.buffer = buffer;
  }

  static create(stream: app.BinaryReader) {
    const offset = stream.readUInt16();
    const buffer = stream.readByteArray();
    return new UpdateEntityMember(offset, buffer);
  }

  readonly offset: number;
  readonly buffer: DataView;
}
