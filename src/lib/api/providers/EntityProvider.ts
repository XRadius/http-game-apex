import * as app from '..';

export class EntityProvider implements app.IPacketProvider {
  private readonly aliveEntities: Record<string, app.Entity>;
  private readonly createEntities: Record<string, app.Entity>;
  private readonly deleteEntities: Record<string, app.Entity>;
  private readonly releasedIds: Array<string>;
  private nextId = 0;

  constructor() {
    this.aliveEntities = {};
    this.createEntities = {};
    this.deleteEntities = {};
    this.releasedIds = [];
  }

  create(entity: app.Entity) {
    if (this.releasedIds.length) {
      const id = this.releasedIds[0];
      this.createEntities[id] = entity;
      this.releasedIds.shift();
    } else {
      const id = this.nextId;
      this.createEntities[id] = entity;
      this.nextId++;
    }
  }

  delete(entity: app.Entity) {
    const aliveEntry = Object
      .entries(this.aliveEntities)
      .find(([_, x]) => x === entity);
    const createEntry = Object
      .entries(this.createEntities)
      .find(([_, x]) => x === entity);
    if (createEntry) {
      const [k] = createEntry;
      delete this.createEntities[k];
    } else if (aliveEntry) {
      const [k, x] = aliveEntry;
      this.deleteEntities[k] = x;
      delete this.aliveEntities[k];
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
    for (const k of Object.keys(this.deleteEntities)) {
      delete this.deleteEntities[k];
      new app.EntityDelete(Number(k)).write(stream);
      this.releasedIds.push(k);
    }
    for (const [k, x] of Object.entries(this.createEntities)) {
      delete this.createEntities[k];
      const members = Object.values(x.members).map(x => new app.EntityCreateMember(x.offset, x.interval, x.buffer.byteLength));
      const requestBatch = Boolean(x.options && x.options.requestBatch);
      new app.EntityCreate(Number(k), x.address, members, requestBatch).write(stream);
      this.aliveEntities[k] = x;
    }
    for (const [k, x] of Object.entries(this.aliveEntities)) {
      if (x.options && x.options.disableUpdate) continue;
      x.update(Number(k), syncId)?.write(stream);
    }
  }

  private handleUpdate(update: app.EntityUpdate) {
    update.entities.forEach(x => this.aliveEntities[x.id]?.receive(x));
  }

  private handleSync(sync: app.BasicSync) {
    Object.values(this.aliveEntities).forEach(x => x.receive(sync));
  }
}
