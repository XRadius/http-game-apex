import * as app from '..';

export class VectorPointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0xC);
  }

  get value() {
    return app.Vector.from(this.buffer);
  }

  set value(value: app.Vector) {
    this.buffer = value.toBuffer();
  }

  toString() {
    return this.value.toString();
  }
}
