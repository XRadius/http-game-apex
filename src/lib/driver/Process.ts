import * as app from '..';
import {Map} from './types/Map';
import {Proc} from './types/Proc';

export class Process {
  private constructor(
    readonly args: Array<string>,
    readonly command: string,
    readonly pid: number) {}

  static create(value: Proc) {
    return new Process(value.args, value.command, value.pid);
  }

  async regionsAsync() {
    const response = await fetch(`/api/proc/${this.pid}/maps`);
    const result = await response.json() as Array<Map>;
    return result.map(x => app.Region.create(x));
  }

  async resolveAsync(...values: Array<app.Pointer | Array<app.Pointer>>) {
    const batch = app.Batch.create(this.pid, values.flatMap(x => x));
    await batch.resolveAsync();
  }
}
