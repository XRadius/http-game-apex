import * as app from '..';

export class ButtonList extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    readonly inAttack = new app.UInt8(app.buttonOffsets.inAttack)) {
    super(new app.api.Entity(address, [inAttack]));
  }
}
