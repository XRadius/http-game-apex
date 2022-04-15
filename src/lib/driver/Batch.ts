import * as app from '..';

export class Batch {
  private constructor(
    private readonly pid: number,
    readonly pointers: Array<app.Pointer>) {}

  static create(pid: number, values: Array<app.Pointer>) {
    return new Batch(pid, values);
  }

  async resolveAsync() {
    if (!this.pointers.length) return;
    const request = this.pointers.map(x => `${x.address.toString(16)}:${x.size.toString(16)}`).join(',');
    const response = await fetch(`/api/proc/${this.pid}/mem/${request}`);
    const result = await response.arrayBuffer().then(x => new DataView(x));
    for (var i = 0; i < result.byteLength; i += 2) {
      const pi = result.getUint16(i, true);
      const size = this.pointers[pi].size;
      this.pointers[pi].resolve(new DataView(result.buffer, i + 2, size));
      i += size;
    }
  }
}
