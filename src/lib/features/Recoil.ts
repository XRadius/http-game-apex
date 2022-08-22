import * as app from '..';

export class Recoil {
  private inSync = false;
  private lockUntil = 0;
  private vecPunchWeaponAngle = app.core.VectorData.none;

  update(buttonList: app.core.ButtonList, localPlayer: app.core.Player, timer: number) {
    if (localPlayer.viewAngle.source.syncId) {
      /* We sent an update, but did not receive confirmation! */
    } else if (!buttonList.inAttack.value) {
      this.inSync = false;
      this.vecPunchWeaponAngle = app.core.VectorData.none;
    } else if (this.inSync) {
      this.inSync = false;
      this.lockUntil = Date.now() + timer;
    } else if (this.lockUntil < Date.now()) {
      const vecPunchWeaponAngle = localPlayer.vecPunchWeaponAngle.value;
      const viewAngle = localPlayer.viewAngle.value;
      if (Math.abs(vecPunchWeaponAngle.x) >= 0.5 || Math.abs(vecPunchWeaponAngle.y) >= 0.5 || Math.abs(vecPunchWeaponAngle.z) >= 0.5) {
        localPlayer.viewAngle.delta(viewAngle.add(this.vecPunchWeaponAngle).subtract(vecPunchWeaponAngle));
        this.inSync = true;
        this.vecPunchWeaponAngle = vecPunchWeaponAngle;
      }
    }
  }
}
