import * as app from '..';
const maxEntities = Array(60).fill(0).map((_, i) => i);

export class EntityList extends app.api.Adapter<app.api.Entity> {
  private readonly players: Record<string, app.Player> = {};

  constructor(address: bigint,
    private readonly channel: app.api.Channel,
    private readonly entities = maxEntities.map(x => new app.UInt64(x << 5, 1000))) {
    super(new app.api.Entity(address, entities));
    this.source.emitter.addEventListener('postReceive', this.onPostReceive.bind(this));
  }

  get value() {
    return Object.values(this.players).filter(x => x.isValid);
  }

  private handleCreates(addresses: Array<bigint>) {
    for (const x of addresses) {
      const key = x.toString(16);
      if (!this.players[key]) {
        const player = new app.Player(x);
        this.players[key] = player;
        this.channel.create(player);
      }
    }
  }

  private handleDeletes(addresses: Array<bigint>) {
    for (const x of addresses) {
      const key = x.toString(16);
      if (this.players[key]) {
        this.channel.delete(this.players[key]);
        delete this.players[key];
      }
    }
  }

  private onPostReceive() {
    const values = this.entities
      .map(x => x.value)
      .filter(Boolean);
    this.handleCreates(values
      .filter(x => !this.players[x.toString(16)]));
    this.handleDeletes(Object.keys(this.players)
      .map(x => BigInt(`0x${x}`))
      .filter(x => !values.includes(x)));
  }
}
