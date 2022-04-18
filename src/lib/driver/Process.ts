import * as app from '..';
import {Map} from './types/Map';
import {Proc} from './types/Proc';

export class Process {
  constructor(value: Proc,
    readonly args = value.args,
    readonly command = value.command,
    readonly pid = value.pid) {}

  batch(...values: Array<app.Pointer | Array<app.Pointer>>) {
    return new app.Batch(this.pid, values.flatMap(x => x));
  }
  
  async regionsAsync() {
    const response = await fetch(`/api/proc/${this.pid}/maps`);
    const result = await response.json() as Array<Map>;
    return result.map(x => new app.Region(x));
  }
}
