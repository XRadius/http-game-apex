import * as app from '..';
const maxEntities = 0x10000;

export class EntityList extends app.api.Adapter<app.api.Entity> {
  private nextTime = 0;
  
  constructor(address: bigint,
    private readonly pointers = Array(maxEntities).fill(0).map((_, i) => new app.UInt64(i << 5, 1000)),
    private readonly values: Record<string, app.Entity> = {}) {
    super(new app.api.Entity(address, pointers, {disableUpdate: true, requestBatch: true}));
  }

  get value() {
    return Object.values(this.values);
  }

  update(channel: app.api.Channel) {
    if (!this.nextTime || this.nextTime < Date.now()) {
      this.onUpdate(channel);
      this.nextTime = Date.now() + 1000;
    }
  }

  private checkCreate(address: bigint, channel: app.api.Channel, knownKeys: Record<string, boolean>) {
    const key = String(address);
    if (!this.values[key]) {
      const entity = new app.Entity(address);
      this.values[key] = entity;
      channel.create(entity);
      knownKeys[key] = true;
    } else {
      knownKeys[key] = true;
    }
  }

  private onUpdate(channel: app.api.Channel) {
    const knownKeys: Record<string, boolean> = {};
    for (const pointer of this.pointers) {
      const address = pointer.value;
      if (!address) continue;
      this.checkCreate(address, channel, knownKeys);
    }
    for (const [k, v] of Object.entries(this.values)) {
      if (knownKeys[k]) continue;
      channel.delete(v);
      delete this.values[k];
    }
  }
}
