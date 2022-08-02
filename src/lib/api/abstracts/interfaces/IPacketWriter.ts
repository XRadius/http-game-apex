import * as app from '../..';

export interface IPacketWriter {
  write(stream: app.BinaryWriter): void;
}
