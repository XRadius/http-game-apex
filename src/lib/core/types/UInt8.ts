import * as app from '..';

export class UInt8 extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 1));
  }

  get value() {
    return this.source.buffer.getUint8(0);
  }

  set value(value: number) {
    if (value === this.value) return;
    this.source.buffer.setUint8(0, value);
    this.source.send = true;
  }

  toString() {
    return this.value.toString();
  }
}
