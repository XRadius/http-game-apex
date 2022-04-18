import * as app from '..';

export class Batch {
  constructor(
    readonly pid: number,
    readonly pointers: Array<app.Pointer>) {}

  async readAsync() {
    if (!this.pointers.length) return;
    const request = this.pointers.map(x => `${x.address.toString(16)}:${x.bufferSize.toString(16)}`).join(',');
    const response = await fetch(`/api/proc/${this.pid}/mem/${request}`);
    const result = await response.arrayBuffer().then(x => new DataView(x));
    for (let i = 0; i < result.byteLength; i += 2) {
      const pi = result.getUint16(i, true);
      const size = this.pointers[pi].bufferSize;
      this.pointers[pi].buffer = new DataView(result.buffer, i + 2, size);
      i += size;
    }
  }

  async writeAsync() {
    if (!this.pointers.length) return;
    const body = await new Blob(this.pointers.map(x => x.buffer)).arrayBuffer();
    const request = this.pointers.map(x => `${x.address.toString(16)}:${x.bufferSize.toString(16)}`).join(',');
    await fetch(`/api/proc/${this.pid}/mem/${request}`, {body, method: 'PUT'});
  }
}
