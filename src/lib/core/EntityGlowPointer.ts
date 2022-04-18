import * as app from '..';

export class EntityGlowPointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0x4);
  }

  get value() {
    return app.EntityGlow.from(this.buffer);
  }

  set value(value: app.EntityGlow) {
    this.buffer = value.toBuffer();
  }
  
  toString() {
    return this.value.toString();
  }
}
