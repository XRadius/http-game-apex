import * as app from '.';

export class Process {
  constructor(value: app.IProcess,
    readonly args = value.args,
    readonly command = value.command,
    readonly pid = value.pid) {}

  async regionsAsync() {
    const response = await fetch(`/api/proc/${this.pid}/maps`);
    const result = await response.json() as Array<app.IRegion>;
    return result.map(x => new app.Region(x));
  }
}

export type IProcess = {
  args: Array<string>,
  command: string,
  pid: number
};
