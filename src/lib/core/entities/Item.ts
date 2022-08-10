import * as app from '..';

export class Item extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.entityOffsets.localOrigin, 60000),
    readonly highlightFunctionBits = new app.UInt32(app.itemOffsets.highlightFunctionBits, 1000),
    readonly customScriptInt = new app.UInt32(app.itemOffsets.customScriptInt, 60000)) {
    super(new app.api.Entity(address, [localOrigin, highlightFunctionBits, customScriptInt], {enableUpdate: true}));
  }

  get hasColor() {
    return Boolean(this.createColor());
  }

  createColor() {
    switch (this.customScriptInt.value) {
      case ItemType.PhoenixKit:
        return '#DCE775'; // Lime
      case ItemType.MedKit:
        return '#81C784'; // Green
      case ItemType.ShieldBattery:
        return '#64B5F6'; // Blue
      case ItemType.EvoShield3:
        return '#BA68C8'; // Purple
      default:
        return;
    }
  }
  
  toString() {
    return app.serialize(this);
  }
}

enum ItemType {
  PhoenixKit = 161,
  MedKit = 162,
  ShieldBattery = 164,
  EvoShield3 = 177
}
