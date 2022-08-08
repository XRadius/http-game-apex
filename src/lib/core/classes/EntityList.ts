import * as app from '..';
const maxEntities = Array(1000).fill(0).map((_, i) => i);

export class EntityList extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    private readonly channel: app.api.Channel,
    private readonly entities: Record<string, app.Entity> = {},
    private readonly pointers = maxEntities.map(x => new app.UInt64(x << 5, 1000))) {
    super(new app.api.Entity(address, pointers));
    this.source.emitter.addEventListener('postReceive', this.onPostReceive.bind(this));
  }

  get value() {
    return Object.values(this.entities);
  }

  private handleCreates(values: Array<bigint>) {
    for (const x of values) {
      const key = x.toString(16);
      if (!this.entities[key]) {
        const entity = new app.Entity(x);
        this.entities[key] = entity;
        this.channel.create(entity);
      }
    }
  }

  private handleDeletes(values: Array<bigint>) {
    for (const x of values) {
      const key = x.toString(16);
      if (this.entities[key]) {
        this.channel.delete(this.entities[key]);
        delete this.entities[key];
      }
    }
  }

  private onPostReceive() {
    const values = this.pointers
      .map(x => x.value)
      .filter(Boolean);
    this.handleCreates(values
      .filter(x => !this.entities[x.toString(16)]));
    this.handleDeletes(Object.keys(this.entities)
      .map(x => BigInt(`0x${x}`))
      .filter(x => !values.includes(x)));
  }
}
