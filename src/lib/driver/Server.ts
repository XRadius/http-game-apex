import * as app from '..';
import {Proc} from './types/Proc';

export class Server {
  async processesAsync() {
    const response = await fetch('/api/proc');
    const result = await response.json() as Array<Proc>;
    return result.map(x => new app.Process(x));
  }

  async versionAsync() {
    const response = await fetch('/api/version');
    const value = await response.json().catch(() => 0) as Number;
    return value;
  }
}
