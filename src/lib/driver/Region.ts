import {Map} from './types/Map';

export class Region {
  constructor(value: Map,
    readonly start = parseHex(value.start),
    readonly end = parseHex(value.end),
    readonly perms = value.perms,
    readonly offset = parseHex(value.offset),
    readonly devMajor = value.devMajor,
    readonly devMinor = value.devMinor,
    readonly inode = parseHex(value.inode),
    readonly pathname = value.pathname) {}
}

function parseHex(value: string) {
  return /^0x/i.test(value)
    ? BigInt(value)
    : BigInt(`0x${value}`);
}
