import * as app from '..';
import {entityOffsets} from '../offsets/entityOffsets';
import {playerOffsets} from '../offsets/playerOffsets';

export class Player extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(entityOffsets.localOrigin),
    readonly teamNum = new app.UInt8(entityOffsets.iTeamNum, 1000),
    readonly name = new app.UInt64(entityOffsets.iName, 1000),
    readonly glowEnable = new app.UInt8(entityOffsets.glowEnable),
    readonly glowThroughWalls = new app.UInt8(entityOffsets.glowThroughWall),
    readonly lifeState = new app.UInt8(playerOffsets.lifeState),
    readonly viewAngles = new app.Vector(playerOffsets.viewAngles),
    readonly bleedoutState = new app.UInt8(playerOffsets.bleedoutState)) {
    super(new app.api.Entity(address, [localOrigin, teamNum, name, glowEnable, glowThroughWalls, lifeState, viewAngles, bleedoutState]));
  }

  get isValid() {
    return this.name.value
      && !this.lifeState.value
      && !app.shallowEquals(this.localOrigin.value, {x: 0, y: 0, z: 0});
  }
  
  createColor(otherPlayer: app.Player) {
    return this.isSameTeam(otherPlayer)
      ? (this.bleedoutState.value ? '#FFFF00' : '#00FF00')
      : (this.bleedoutState.value ? '#FFA500' : '#FF0000');
  }

  isSameTeam(otherPlayer: app.Player) {
    return this.teamNum.value === otherPlayer.teamNum.value;
  }

  toString() {
    return app.serialize(this);
  }
}
