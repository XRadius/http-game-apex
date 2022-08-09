import * as app from '..';

export class EntityListFilter<T extends app.api.Adapter<app.api.Entity>> {
  private nextTime = 0;
  
  constructor(
    private readonly Constructor: new (address: bigint) => T,
    private readonly signifier: string,
    private readonly values: Record<string, T> = {}) {}
  
  get value() {
    return Object.values(this.values);
  }

  update(channel: app.api.Channel, entityList: app.EntityList, signifierList: app.SignifierList) {
    if (!this.nextTime || this.nextTime < Date.now()) {
      this.onUpdate(channel, entityList, signifierList);
      this.nextTime = Date.now() + 1000;
    }
  }

  private checkCreate(address: bigint, channel: app.api.Channel, knownKeys: Record<string, boolean>) {
    const key = String(address);
    if (!this.values[key]) {
      const value = new this.Constructor(address);
      this.values[key] = value;
      channel.create(value);
      knownKeys[key] = true;
    } else {
      knownKeys[key] = true;
    }
  }

  private onUpdate(channel: app.api.Channel, entityList: app.EntityList, signifierList: app.SignifierList) {
    const knownKeys: Record<string, boolean> = {};
    for (const entity of entityList.value) {
      const signifier = signifierList.get(entity.signifierName.value);
      if (signifier.value !== this.signifier) continue;
      this.checkCreate(entity.address, channel, knownKeys);
    }
    for (const [k, v] of Object.entries(this.values)) {
      if (knownKeys[k]) continue;
      channel.delete(v);
      delete this.values[k];
    }
  }
}
