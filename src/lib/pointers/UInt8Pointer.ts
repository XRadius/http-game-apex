import * as app from '..';

export class UInt8Pointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0x1);
  }

  get value() {
    return this.buffer.getUint8(0);
  }

  set value(value: number) {
    this.buffer.setUint8(0, value);
  }

  toString() {
    return this.value.toString();
  }
}
