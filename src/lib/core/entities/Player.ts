import * as app from '..';

export class Player extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.entityOffsets.localOrigin),
    readonly glowEnable = new app.UInt8(app.playerOffsets.glowEnable),
    readonly glowThroughWalls = new app.UInt8(app.playerOffsets.glowThroughWall),
    readonly teamNum = new app.UInt8(app.playerOffsets.iTeamNum, 1000),
    readonly lifeState = new app.UInt8(app.playerOffsets.lifeState),
    readonly viewAngles = new app.Vector(app.playerOffsets.viewAngles),
    readonly bleedoutState = new app.UInt8(app.playerOffsets.bleedoutState)) {
    super(new app.api.Entity(address, [localOrigin, glowEnable, glowThroughWalls, teamNum, lifeState, viewAngles, bleedoutState]));
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
