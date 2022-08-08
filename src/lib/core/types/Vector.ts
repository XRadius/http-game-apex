import * as app from '..';

export class Vector extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval = 0) {
    super(new app.api.EntityMember(offset, interval, 12));
  }

  get value(): IVector {
    const x = this.source.buffer.getFloat32(0, true);
    const y = this.source.buffer.getFloat32(4, true);
    const z = this.source.buffer.getFloat32(8, true);
    return {x, y, z};
  }

  set value(value: IVector) {
    if (this.value.x === value.x && this.value.y === value.y && this.value.z === value.z) return;
    this.source.buffer.setFloat32(0, value.x, true);
    this.source.buffer.setFloat32(4, value.y, true);
    this.source.buffer.setFloat32(8, value.z, true);
    this.source.send = true;
  }

  toString() {
    return app.serialize(this.value);
  }
}

export type IVector = {
  x: number;
  y: number;
  z: number;
}
