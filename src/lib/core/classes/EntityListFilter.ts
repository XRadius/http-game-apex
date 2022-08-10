import * as app from '..';

export class EntityListFilter<T extends app.api.Adapter<app.api.Entity>> {
  private readonly entities = new Map<bigint, T>();
  private nextTime = 0;
  
  constructor(
    private readonly Constructor: new (address: bigint) => T,
    private readonly signifier: string) {}
  
  get map(): ReadonlyMap<bigint, T> {
    return this.entities;
  }

  update(channel: app.api.Channel, entityList: app.EntityList, signifierList: app.SignifierList) {
    if (!this.nextTime || this.nextTime < Date.now()) {
      this.onUpdate(channel, entityList, signifierList);
      this.nextTime = Date.now() + 1000;
    }
  }

  private checkCreate(address: bigint, channel: app.api.Channel, knownSet: Set<bigint>) {
    if (!this.entities.has(address)) {
      const entity = new this.Constructor(address);
      this.entities.set(address, entity);
      channel.create(entity);
      knownSet.add(address);
    } else {
      knownSet.add(address);
    }
  }

  private onUpdate(channel: app.api.Channel, entityList: app.EntityList, signifierList: app.SignifierList) {
    const knownSet = new Set<bigint>();
    for (const x of entityList.map.values()) {
      const signifier = signifierList.get(x.value);
      if (signifier.value !== this.signifier) continue;
      this.checkCreate(x.source.address, channel, knownSet);
    }
    for (const [k, v] of this.entities) {
      if (knownSet.has(k)) continue;
      this.entities.delete(k);
      channel.delete(v);
    }
  }
}
