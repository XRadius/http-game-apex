import * as app from '..';

export class EntityListFilter<T extends app.api.Adapter<app.api.Entity>> {
  constructor(
    private readonly Constructor: new (address: bigint) => T,
    private readonly signifier: string,
    private readonly values: Record<string, T> = {}) {}
  
  get value() {
    return Object.values(this.values);
  }
  
  update(channel: app.api.Channel, entityList: app.EntityList, signifierList: app.SignifierList) {
    const addresses = entityList.value
      .filter(x => signifierList.get(x.signifierName.value).value === this.signifier)
      .map(x => x.address);
    this.handleCreates(channel, addresses
      .filter(x => !this.values[x.toString(16)]));
    this.handleDeletes(channel, Object.keys(this.values)
      .map(x => BigInt(`0x${x}`))
      .filter(x => !addresses.includes(x)));
  }

  private handleCreates(channel: app.api.Channel, values: Array<bigint>) {
    for (const x of values) {
      const key = x.toString(16);
      if (!this.values[key]) {
        const entity = new this.Constructor(x);
        this.values[key] = entity;
        channel.create(entity);
      }
    }
  }

  private handleDeletes(channel: app.api.Channel, values: Array<bigint>) {
    for (const x of values) {
      const key = x.toString(16);
      if (this.values[key]) {
        channel.delete(this.values[key]);
        delete this.values[key];
      }
    }
  }
}
