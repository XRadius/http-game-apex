import * as app from '..';
const maxEntities = 0x10000;

export class EntityList extends app.api.Adapter<app.api.Entity> {
  private readonly entities = new Map<bigint, app.Entity>();
  private nextTime = 0;
  
  constructor(address: bigint,
    private readonly pointers = Array(maxEntities).fill(0).map((_, i) => new app.UInt64(i << 5, 1000))) {
    super(new app.api.Entity(address, pointers, {requestBatch: true}));
  }

  get map(): ReadonlyMap<bigint, app.Entity> {
    return this.entities;
  }

  update(channel: app.api.Channel) {
    if (!this.nextTime || this.nextTime < Date.now()) {
      this.onUpdate(channel);
      this.nextTime = Date.now() + 1000;
    }
  }

  private checkCreate(address: bigint, channel: app.api.Channel, knownSet: Set<bigint>) {
    if (!this.entities.has(address)) {
      const entity = new app.Entity(address);
      this.entities.set(address, entity);
      channel.create(entity);
      knownSet.add(address);
    } else {
      knownSet.add(address);
    }
  }

  private onUpdate(channel: app.api.Channel) {
    const knownSet: Set<bigint> = new Set();
    for (const pointer of this.pointers) {
      const address = pointer.value;
      if (!address) continue;
      this.checkCreate(address, channel, knownSet);
    }
    for (const [k, v] of this.entities) {
      if (knownSet.has(k)) continue;
      this.entities.delete(k);
      channel.delete(v);
    }
  }
}
