import * as app from '..';

export class NPC extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.offsets.entity.localOrigin),
    readonly lastVisibleTime = new app.Float32(app.offsets.entity.lastVisibleTime)) {
    super(new app.api.Entity(address, [localOrigin, lastVisibleTime], {enableUpdate: true}));
  }
  
  createColor() {
    return '#FFF';
  }

  toString() {
    return app.serialize(this);
  }
}
