import * as app from '..';

export class UInt32 extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 4));
  }

  get value() {
    return this.source.buffer.getUint32(0, true);
  }

  set value(value: number) {
    if (value === this.value) return;
    this.source.buffer.setUint32(0, value, true);
    this.source.send = true;
  }

  toString() {
    return this.value.toString();
  }
}
