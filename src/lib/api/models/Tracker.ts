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

  receive(update: app.UpdateArray) {
    for (const x of update.entities) {
      this.aliveEntities[x.address.toString(16)]?.receive(x);
    }
  }

  update(writer: app.BinaryWriter) {
    for (const [k, x] of Object.entries(this.deleteEntities)) {
      const packet = new app.DeleteEntity(x.address);
      writer.writeUInt8(app.PacketType.DeleteEntity);
      packet.write(writer);
      delete this.deleteEntities[k];
    }
    for (const [k, x] of Object.entries(this.createEntities)) {
      this.aliveEntities[k] = x;
      const members = Object.values(x.members).map(x => new app.CreateEntityMember(x.offset, x.interval, x.buffer.byteLength));
      const packet = new app.CreateEntity(x.address, members);
      writer.writeUInt8(app.PacketType.CreateEntity);
      packet.write(writer);
      delete this.createEntities[k];
    }
    for (const x of Object.values(this.aliveEntities)) {
      const packet = x.update();
      if (!packet) continue;
      writer.writeUInt8(app.PacketType.ChangeEntity);
      packet.write(writer);
    }
  }
}
