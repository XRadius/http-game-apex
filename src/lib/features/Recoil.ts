import * as app from '..';

export class Recoil {
  private inSync = false;
  private lockUntil = 0;
  private vecAngles = app.core.VectorData.none;

  update(buttonList: app.core.ButtonList, localPlayer: app.core.Player, timer: number) {
    if (localPlayer.viewAngles.source.syncId) {
      /* We sent an update, but did not receive confirmation! */
    } else if (!buttonList.inAttack.value) {
      this.inSync = false;
      this.vecAngles = app.core.VectorData.none;
    } else if (this.inSync) {
      this.inSync = false;
      this.lockUntil = Date.now() + timer;
    } else if (this.lockUntil < Date.now()) {
      const vecAngles = localPlayer.vecPunchWeaponAngle.value;
      const viewAngles = localPlayer.viewAngles.value;
      if (Math.abs(vecAngles.x) >= 0.5 || Math.abs(vecAngles.y) >= 0.5 || Math.abs(vecAngles.z) >= 0.5) {
        localPlayer.viewAngles.delta(viewAngles.add(this.vecAngles).subtract(vecAngles));
        this.inSync = true;
        this.vecAngles = vecAngles;
      }
    }
  }
}
