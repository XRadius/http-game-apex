import * as app from '..';

export class EntityProvider implements app.IPacketProvider {
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

  receive(value: app.BasicSync | app.EntityUpdate) {
    if (value instanceof app.EntityUpdate) {
      this.handleUpdate(value);
    } else {
      this.handleSync(value);
    }
  }

  update(stream: app.BinaryWriter, syncId: number) {
    for (const [k, x] of Object.entries(this.deleteEntities)) {
      new app.EntityDelete(x.address).write(stream);
      delete this.deleteEntities[k];
    }
    for (const [k, x] of Object.entries(this.createEntities)) {
      this.aliveEntities[k] = x;
      const members = Object.values(x.members).map(x => new app.EntityCreateMember(x.offset, x.interval, x.buffer.byteLength));
      new app.EntityCreate(x.address, members).write(stream);
      delete this.createEntities[k];
    }
    for (const x of Object.values(this.aliveEntities)) {
      x.update(syncId)?.write(stream);
    }
  }

  private handleUpdate(update: app.EntityUpdate) {
    update.entities.forEach(x => this.aliveEntities[x.address.toString(16)]?.receive(x));
  }

  private handleSync(sync: app.BasicSync) {
    Object.values(this.aliveEntities).forEach(x => x.receive(sync));
  }
}
