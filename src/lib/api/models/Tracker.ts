import * as app from '..';

export class Tracker {
  private readonly aliveEntities: Record<string, app.Entity>;
  private readonly createEntities: Record<string, app.Entity>;
  private readonly deleteEntities: Record<string, app.Entity>;

  constructor() {
    this.aliveEntities = {};
    this.createEntities = {};
    this.deleteEntities = {};
  }

  create(entity: app.Entity) {
    const key = entity.address.toString(16);
    if (this.aliveEntities[key] || this.createEntities[key]) {
      throw new Error(`Duplicate entity: ${key}`);
    } else {
      this.createEntities[key] = entity;
    }
  }

  delete(entity: app.Entity) {
    const key = entity.address.toString(16);
    if (this.deleteEntities[key]) {
      throw new Error(`Pending entity: ${entity}`);
    } else if (this.createEntities[key]) {
      delete this.createEntities[key];
    } else if (this.aliveEntities[key]) {
      this.deleteEntities[key] = this.aliveEntities[key];
      delete this.aliveEntities[key];
    }
  }

  receive(update: app.EntityUpdate) {
    for (const x of update.entities) {
      this.aliveEntities[x.address.toString(16)]?.receive(x);
    }
  }

  update(stream: app.BinaryWriter) {
    for (const [k, x] of Object.entries(this.deleteEntities)) {
      const packet = new app.EntityDelete(x.address);
      stream.writeUInt8(app.PacketType.EntityDelete);
      packet.write(stream);
      delete this.deleteEntities[k];
    }
    for (const [k, x] of Object.entries(this.createEntities)) {
      this.aliveEntities[k] = x;
      const members = Object.values(x.members).map(x => new app.EntityCreateMember(x.offset, x.interval, x.buffer.byteLength));
      const packet = new app.EntityCreate(x.address, members);
      stream.writeUInt8(app.PacketType.EntityCreate);
      packet.write(stream);
      delete this.createEntities[k];
    }
    for (const x of Object.values(this.aliveEntities)) {
      const packet = x.update();
      if (!packet) continue;
      stream.writeUInt8(app.PacketType.EntityChange);
      packet.write(stream);
    }
  }
}
