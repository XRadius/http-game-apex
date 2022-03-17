import * as app from '..';
import {playerOffsets} from './offsets/playerOffsets';

export class PlayerFactory {
  private constructor(
    readonly isLocal: boolean,
    readonly bleedoutState: app.Pointer,
    readonly health: app.Pointer,
    readonly healthMax: app.Pointer,
    readonly lifeState: app.Pointer,
    readonly localOrigin: app.Pointer,
    readonly shieldHealth: app.Pointer,
    readonly shieldHealthMax: app.Pointer,
    readonly teamNum: app.Pointer,
    readonly viewAngles: app.Pointer) {}

  static create(address: bigint, isLocal: boolean) {
    const bleedoutState = new app.Pointer(address + playerOffsets.bleedoutState, 0x1);
    const health = new app.Pointer(address + playerOffsets.iHealth, 0x1);
    const healthMax = new app.Pointer(address + playerOffsets.iMaxHealth, 0x1);
    const lifeState = new app.Pointer(address + playerOffsets.lifeState, 0x1);
    const localOrigin = new app.Pointer(address + playerOffsets.localOrigin, 0xC);
    const shieldHealth = new app.Pointer(address + playerOffsets.shieldHealth, 0x1);
    const shieldHealthMax = new app.Pointer(address + playerOffsets.shieldHealthMax, 0x1);
    const teamNum = new app.Pointer(address + playerOffsets.iTeamNum, 0x1);
    const viewAngles = new app.Pointer(address + playerOffsets.viewAngles, 0xC);
    return new PlayerFactory(isLocal, bleedoutState, health, healthMax, lifeState, localOrigin, shieldHealth, shieldHealthMax, teamNum, viewAngles);
  }

  build() {
    const bleedoutState = this.bleedoutState.buffer.getUint8(0);
    const health = this.health.buffer.getUint8(0);
    const healthMax = this.healthMax.buffer.getUint8(0);
    const lifeState = this.lifeState.buffer.getUint8(0);
    const localOrigin = new app.Vector(this.localOrigin.buffer);
    const shieldHealth = this.shieldHealth.buffer.getUint8(0);
    const shieldHealthMax = this.shieldHealthMax.buffer.getUint8(0);
    const teamNum = this.teamNum.buffer.getUint8(0);
    const viewAngles = new app.Vector(this.viewAngles.buffer);
    return new app.Player(this.isLocal, bleedoutState, health, healthMax, lifeState, localOrigin, shieldHealth, shieldHealthMax, teamNum, viewAngles);
  }
}
