import * as app from '..';

export class Float32 extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 4));
  }

  get value() {
    return this.source.buffer.getFloat32(0, true);
  }

  set value(value: number) {
    if (value === this.value) return;
    this.source.buffer.setFloat32(0, value, true);
    this.source.send = true;
  }

  toString() {
    return this.value.toString();
  }
}
