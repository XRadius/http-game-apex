import * as app from '.';

export class Server {
  async processesAsync() {
    const response = await fetch('/api/proc');
    const result = await response.json() as Array<app.IProcess>;
    return result.map(x => new app.Process(x));
  }

  async versionAsync() {
    const response = await fetch('/api/version');
    const result = await response.json().catch(() => 0) as Number;
    return result;
  }
}
