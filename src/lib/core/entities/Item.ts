import * as app from '..';

export class Item extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.entityOffsets.localOrigin, 60000),
    readonly highlightFunctionBits = new app.Glow(app.itemOffsets.highlightFunctionBits, 1000),
    readonly customScriptInt = new app.UInt32(app.itemOffsets.customScriptInt, 60000)) {
    super(new app.api.Entity(address, [localOrigin, highlightFunctionBits, customScriptInt], {enableUpdate: true}));
  }
  
  toString() {
    return app.serialize(this);
  }
}
