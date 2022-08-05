import * as app from '../..';

export interface IPacketProvider {
  update(stream: app.BinaryWriter, syncId: number): void;
}
