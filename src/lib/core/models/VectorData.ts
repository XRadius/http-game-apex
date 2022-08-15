import * as app from '..';

export class VectorData {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number) {}

  isSame(otherVector: VectorData) {
    return this.x === otherVector.x
      && this.y === otherVector.y
      && this.z === otherVector.z;
  }

  toString() {
    return app.serialize(this);
  }
}
