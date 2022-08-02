import * as app from '..';

export class UInt8 extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 0x1));
  }

  get value() {
    return this.source.buffer.getUint8(0);
  }

  set value(value: number) {
    if (value === this.value) return;
    this.source.sendChange = new DataView(new ArrayBuffer(1));
    this.source.sendChange.setInt8(0, value);
  }

  toString() {
    return this.value.toString();
  }
}
