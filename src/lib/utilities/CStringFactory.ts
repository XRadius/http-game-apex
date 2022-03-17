import * as app from '..';

export class CStringFactory {
  constructor(
    private readonly pointer: app.Pointer) {}

  build() {
    return new app.CString(this.pointer.buffer).toString();
  }
}
