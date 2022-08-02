import * as app from '.';

export class Region {
  constructor(value: app.IRegion,
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

export type IRegion = {
  devMajor: number,
  devMinor: number,
  end: string,
  inode: string,
  offset: string,
  pathname: string,
  perms: number,
  start: string
};
