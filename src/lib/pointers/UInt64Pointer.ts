import * as app from '..';

export class UInt64Pointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0x8);
  }

  get value() {
    return this.buffer.getBigUint64(0, true);
  }

  set value(value: bigint) {
    this.buffer.setBigUint64(0, value, true);
  }

  toString() {
    return this.value.toString();
  }
}
