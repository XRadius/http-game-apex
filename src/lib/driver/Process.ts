import * as app from '..';
import {Http} from './classes/Http';
import {Map} from './types/Map';
import {Proc} from './types/Proc';

export class Process {
  private constructor(
    private readonly http: Http,
    readonly args: Array<string>,
    readonly command: string,
    readonly pid: number) {}

  static create(http: Http, value: Proc) {
    return new Process(http, value.args, value.command, value.pid);
  }

  async regionsAsync() {
    const response = await this.http.getAsync(`/api/v1.0/proc/${this.pid}/maps`);
    const result = await response.json() as Array<Map>;
    return result.map(x => app.Region.create(x));
  }

  async resolveAsync(...values: Array<app.Pointer | Array<app.Pointer>>) {
    const batch = app.Batch.create(this.http, this.pid, values.flatMap(x => x));
    await batch.resolveAsync();
  }
}
