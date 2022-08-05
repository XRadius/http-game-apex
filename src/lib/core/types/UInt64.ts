import * as app from '..';

export class UInt64 extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 8));
  }

  get value() {
    return this.source.buffer.getBigUint64(0, true);
  }

  set value(value: bigint) {
    if (value === this.value) return;
    this.source.buffer.setBigUint64(0, value, true);
    this.source.send = true;
  }

  toString() {
    return this.value.toString();
  }
}
