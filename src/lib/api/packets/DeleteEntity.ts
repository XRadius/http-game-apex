import * as app from '..';

export class DeleteEntity implements app.IPacketWriter {
  constructor(address: bigint) {
    this.address = address;
  }

  write(stream: app.BinaryWriter) {
    stream.writeUInt64(this.address);
  }

  readonly address: bigint;
}
