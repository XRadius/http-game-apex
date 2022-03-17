import {Map} from './types/Map';

export class Region {
  private constructor(
    readonly start: bigint,
    readonly end: bigint,
    readonly perms: number,
    readonly offset: bigint,
    readonly devMajor: number,
    readonly devMinor: number,
    readonly inode: bigint,
    readonly pathname: string) {}

  static create(value: Map) {
    const start = parseHex(value.start);
    const end = parseHex(value.end);
    const offset = parseHex(value.offset);
    const inode = parseHex(value.inode);
    return new Region(start, end, value.perms, offset, value.devMajor, value.devMinor, inode, value.pathname);
  }
}

function parseHex(value: string) {
  return /^0x/i.test(value)
    ? BigInt(value)
    : BigInt(`0x${value}`);
}
