import * as app from '..';

export class Vector extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 12));
  }

  delta(value: app.VectorData) {
    if (this.value.isSame(value)) return;
    const {x, y, z} = value.subtract(this.value);
    this.source.buffer.setFloat32(0, value.x, true);
    this.source.buffer.setFloat32(4, value.y, true);
    this.source.buffer.setFloat32(8, value.z, true);
    this.source.deltas = [delta(0, x), delta(4, y), delta(8, z)];
    this.source.send = true;
  }

  get value() {
    const x = this.source.buffer.getFloat32(0, true);
    const y = this.source.buffer.getFloat32(4, true);
    const z = this.source.buffer.getFloat32(8, true);
    return new app.VectorData(x, y, z);
  }

  set value(value: app.VectorData) {
    if (this.value.isSame(value)) return;
    this.source.buffer.setFloat32(0, value.x, true);
    this.source.buffer.setFloat32(4, value.y, true);
    this.source.buffer.setFloat32(8, value.z, true);
    this.source.send = true;
  }

  toString() {
    return app.serialize(this.value);
  }
}

function delta(offset: number, value: number) {
  const data = new DataView(new ArrayBuffer(4));
  data.setFloat32(0, value, true);
  return new app.api.EntityChangeMemberDelta(offset, app.api.DeltaType.Float32, data);
}
