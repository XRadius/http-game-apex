import * as app from '..';
import {entityOffsets} from './offsets/entityOffsets';

export abstract class Entity {
  constructor(address: bigint,
    readonly localOrigin = new app.VectorPointer(address + entityOffsets.localOrigin),
    readonly teamNum = new app.UInt8Pointer(address + entityOffsets.iTeamNum),
    readonly name = new app.UInt64Pointer(address + entityOffsets.iName),
    readonly glowColor = new app.ColorPointer(address + entityOffsets.glowColor),
    readonly glowType = new app.EntityGlowPointer(address + entityOffsets.glowType),
    readonly glowEnable = new app.UInt8Pointer(address + entityOffsets.glowEnable),
    readonly glowThroughWalls = new app.UInt8Pointer(address + entityOffsets.glowThroughWall)) {}
}
