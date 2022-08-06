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

  receive(value: app.BasicSync | app.EntityUpdateEntityMember) {
    if (value instanceof app.EntityUpdateEntityMember) {
      this.handleUpdate(value);
    } else {
      this.handleSync(value);
    }
  }

  update(syncId: number) {
    if (!this.send) return;
    this.send = false;
    this.syncId = syncId;
    return new app.EntityChangeMember(this.offset, this.buffer);
  }

  private handleUpdate(update: app.EntityUpdateEntityMember) {
    if (!this.syncId && update.buffer.byteLength === this.buffer.byteLength) {
      for (let i = 0; i < update.buffer.byteLength; i++) {
        this.buffer.setInt8(i, update.buffer.getInt8(i));
      }
    }
  }

  private handleSync(sync: app.BasicSync) {
    if (this.syncId === sync.id) {
      delete this.syncId;
    }
  }
}
