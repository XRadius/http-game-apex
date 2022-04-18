import * as app from '..';

export class CStringPointer extends app.Pointer {
  get value() {
    return app.CString.from(this.buffer);
  }

  toString() {
    return this.value.toString();
  }
}
