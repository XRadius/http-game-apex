import * as app from '..';

export class ButtonList extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    readonly inSpeed = new app.UInt8(app.offsets.button.inSpeed),
    readonly inAttack = new app.UInt8(app.offsets.button.inAttack)) {
    super(new app.api.Entity(address, [inSpeed, inAttack]));
  }
}
