import * as app from '..';

export class EntityChangeMemberDelta implements app.IPacketWriter {
  constructor(
    readonly offset: number,
    readonly type: app.DeltaType,
    readonly buffer: DataView) {}

  write(stream: app.BinaryWriter) {
    stream.writeVariableLength(this.offset);
    stream.writeUInt8(this.type);
    stream.writeBytes(this.buffer);
  }
}
