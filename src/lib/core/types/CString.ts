import * as app from '..';

export class CString extends app.api.Adapter<app.api.EntityMember> {
  constructor(offset: number, interval: number, size: number) {
    super(new app.api.EntityMember(offset, interval, size));
  }

  get value() {
    let result = '';
    iterateBytes(this.source.buffer, x => result += x);
    return result;
  }

  toString() {
    return this.value.toString();
  }
}

function iterateBytes(buffer: DataView, add: (value: string) => void) {
  for (let i = 0; i < buffer.byteLength; i++) {
    const charCode = buffer.getUint8(i);
    if (charCode === 0) break;
    add(String.fromCharCode(charCode));
  }
}
