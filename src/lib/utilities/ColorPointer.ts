import * as app from '..';

export class ColorPointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0xC);
  }

  get value() {
    return app.Color.from(this.buffer);
  }

  set value(value: app.Color) {
    this.buffer = value.toBuffer();
  }

  toString() {
    return this.value.toString();
  }
}
