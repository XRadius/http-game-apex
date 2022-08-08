import * as app from '..';

export class SignifierList {
  constructor(
    private readonly channel: app.api.Channel,
    private readonly signifiers: Record<string, app.Signifier> = {}) {}

  get(address: bigint) {
    const key = address.toString(16);
    if (this.signifiers[key]) {
      return this.signifiers[key];
    } else {
      this.signifiers[key] = new app.Signifier(address);
      this.channel.create(this.signifiers[key]);
      return this.signifiers[key];
    }
  }
}
