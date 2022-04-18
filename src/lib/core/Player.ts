import * as app from '..';
import {playerOffsets} from './offsets/playerOffsets';

export class Player extends app.Entity {
  constructor(address: bigint,
    readonly isLocal: boolean,
    readonly lifeState = new app.UInt8Pointer(address + playerOffsets.lifeState),
    readonly viewAngles = new app.VectorPointer(address + playerOffsets.viewAngles),
    readonly bleedoutState = new app.UInt8Pointer(address + playerOffsets.bleedoutState)) {
    super(address);
  }
  
  get isValid() {
    return this.name.value
      && !this.lifeState.value
      && !app.shallowEquals(this.localOrigin.value, new app.Vector(0, 0, 0));
  }
  
  createColor(otherPlayer: app.Player, mode?: string) {
    return this.isLocal ? '#0000FF' : this.isSameTeam(otherPlayer, mode)
      ? (this.bleedoutState.value ? '#FFFF00' : '#00FF00')
      : (this.bleedoutState.value ? '#FFA500' : '#FF0000');
  }

  isSameTeam(otherPlayer: app.Player, mode?: string) {
    switch (mode) {
      case 'control':
        return this.teamNum.value % 2 === otherPlayer.teamNum.value % 2;
      default:
        return this.teamNum.value === otherPlayer.teamNum.value;
    }
  }

  toString() {
    return app.serialize(this);
  }
}
