export class CString {
  constructor(
    private readonly buffer: DataView) {}

  toString() {
    var result = '';
    iterateBytes(this.buffer, x => result += x);
    return result;
  }
}

function iterateBytes(buffer: DataView, add: (value: string) => void) {
  for (var i = 0; i < buffer.byteLength; i++) {
    const charCode = buffer.getUint8(i);
    if (charCode === 0) break;
    add(String.fromCharCode(charCode));
  }
}
