import * as app from '..';

export class EntityMember {
  readonly buffer: DataView;
  readonly interval: number;
  readonly offset: number;
  send?: boolean;
  syncId?: number;

  constructor(offset: number, interval: number, size: number) {
    this.buffer = new DataView(new ArrayBuffer(size));
    this.interval = interval;
    this.offset = offset;
  }

  receive(packet: app.BasicSync | app.EntityUpdateEntityMember) {
    if (packet instanceof app.EntityUpdateEntityMember) {
      this.receiveUpdate(packet);
    } else {
      this.receiveSync(packet);
    }
  }

  update(syncId: number) {
    if (!this.send) return;
    this.send = false;
    this.syncId = syncId;
    return new app.EntityChangeMember(this.offset, this.buffer);
  }

  private receiveUpdate(packet: app.EntityUpdateEntityMember) {
    if (typeof this.syncId !== 'undefined') return;
    if (packet.buffer.byteLength !== this.buffer.byteLength) return;
    for (let i = 0; i < packet.buffer.byteLength; i++) this.buffer.setInt8(i, packet.buffer.getInt8(i));
  }

  private receiveSync(packet: app.BasicSync) {
    if (this.syncId !== packet.id) return;
    this.syncId = undefined;
  }
}
