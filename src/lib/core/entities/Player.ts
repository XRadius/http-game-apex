import * as app from '..';

export class Player extends app.api.Adapter<app.api.Entity> {
  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.Vector(app.offsets.entity.localOrigin),
    readonly glowEnable = new app.UInt8(app.offsets.player.glowEnable),
    readonly glowThroughWalls = new app.UInt8(app.offsets.player.glowThroughWall),
    readonly teamNum = new app.UInt8(app.offsets.player.iTeamNum, 1000),
    readonly name = new app.UInt64(app.offsets.player.iName),
    readonly lifeState = new app.UInt8(app.offsets.player.lifeState),
    readonly lastVisibleTime = new app.Float32(app.offsets.entity.lastVisibleTime),
    readonly vecPunchWeaponAngle = new app.Vector(app.offsets.player.vecPunchWeaponAngle),
    readonly viewAngle = new app.Vector(app.offsets.player.viewAngle),
    readonly bleedoutState = new app.UInt8(app.offsets.player.bleedoutState)) {
    super(new app.api.Entity(address, [localOrigin, glowEnable, glowThroughWalls, teamNum, name, lifeState, lastVisibleTime, vecPunchWeaponAngle, viewAngle, bleedoutState], {enableUpdate: true}));
  }
  
  get isValid() {
    return !this.lifeState.value
      && this.name.value
      && this.glowEnable.value !== 0
      && this.glowEnable.value !== 255;
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
