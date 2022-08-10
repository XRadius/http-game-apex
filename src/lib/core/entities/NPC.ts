import * as app from '..';

export class NPC extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.entityOffsets.localOrigin)) {
    super(new app.api.Entity(address, [localOrigin], {enableUpdate: true}));
  }
  
  createColor() {
    return '#FFF';
  }

  toString() {
    return app.serialize(this);
  }
}
