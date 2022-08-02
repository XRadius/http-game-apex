import * as app from '..';

export class LocalPlayer extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    private readonly localPlayer = new app.UInt64(0, 1000)) {
    super(new app.api.Entity(address, [localPlayer]));
  }

  get value() {
    return this.localPlayer.value;
  }
}
