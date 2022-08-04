import * as app from '..';

export class EntityMember {
  readonly buffer: DataView;
  readonly interval: number;
  readonly offset: number;
  sendChange?: DataView;

  constructor(offset: number, interval: number, size: number) {
    this.buffer = new DataView(new ArrayBuffer(size));
    this.interval = interval;
    this.offset = offset;
  }

  receive(update: app.EntityUpdateEntityMember) {
    if (update.buffer.byteLength === this.buffer.byteLength) {
      for (let i = 0; i < update.buffer.byteLength; i++) {
        this.buffer.setInt8(i, update.buffer.getInt8(i));
      }
    }
  }

  update() {
    const packet = this.sendChange && new app.EntityChangeMember(this.offset, this.sendChange);
    delete this.sendChange;
    return packet;
  }
}
