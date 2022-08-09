import * as app from '..';

export class Entity extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly signifierName = new app.UInt64(app.entityOffsets.iSignifierName, 60000)) {
    super(new app.api.Entity(address, [signifierName]));
  }
}
