import * as app from '..';

export class SignifierList {
  constructor(
    private readonly channel: app.api.Channel,
    private readonly signifiers: Map<bigint, app.Signifier> = new Map()) {}

  get(address: bigint) {
    return this.signifiers.get(address) ?? this.create(address);
  }

  private create(address: bigint) {
    const signifier = new app.Signifier(address);
    this.signifiers.set(address, signifier);
    this.channel.create(signifier);
    return signifier;
  }
}
