import * as app from '..';

export class Glow extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 4));
  }

  get value() {
    const value = this.source.buffer.getUint32(0, true);
    return app.GlowData.fromUInt32(value);
  }

  set value(value: app.GlowData) {
    if (this.value.isSame(value)) return;
    this.source.buffer.setUint32(0, value.toUInt32(), true);
    this.source.send = true;
  }

  toString() {
    return app.serialize(this.value);
  }
}
