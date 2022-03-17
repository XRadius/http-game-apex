import * as app from '..';
import {Http} from './classes/Http';
import {Proc} from './types/Proc';

export class Server {
  private constructor(
    private readonly http: Http) {}

  static create(baseUrl: string, username: string, password: string) {
    const authorization = `Basic ${btoa(`${username}:${password}`)}`;
    const http = new Http(baseUrl, {authorization});
    return new Server(http);
  }

  async processesAsync() {
    const response = await this.http.getAsync('/api/v1.0/proc');
    const result = await response.json() as Array<Proc>;
    return result.map(x => app.Process.create(this.http, x));
  }
}
