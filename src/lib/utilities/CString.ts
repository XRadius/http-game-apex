export class CString extends String {
  static from(buffer: DataView): CString {
    let result = '';
    iterateBytes(buffer, x => result += x);
    return result;
  }
}

function iterateBytes(buffer: DataView, add: (value: string) => void) {
  for (let i = 0; i < buffer.byteLength; i++) {
    const charCode = buffer.getUint8(i);
    if (charCode === 0) break;
    add(String.fromCharCode(charCode));
  }
}
