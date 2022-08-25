import * as app from '.';

export class Recoil {
  private vecPunchWeaponAngle = app.core.VectorData.none;

  update(buttonList: app.core.ButtonList, localPlayer: app.core.Player, options: IRecoilOptions) {
    if (localPlayer.viewAngle.source.syncId) {
      /* We sent an update, but did not receive confirmation! */
    } else if (!buttonList.inAttack.value) {
      this.vecPunchWeaponAngle = app.core.VectorData.none;
    } else {
      const vecPunchWeaponAngle = localPlayer.vecPunchWeaponAngle.value;
      const viewAngle = localPlayer.viewAngle.value;
      if (Math.abs(vecPunchWeaponAngle.x) >= 0.5 || Math.abs(vecPunchWeaponAngle.y) >= 0.5 || Math.abs(vecPunchWeaponAngle.z) >= 0.5) {
        const x = viewAngle.x + (this.vecPunchWeaponAngle.x - vecPunchWeaponAngle.x) * options.percentage;
        const y = viewAngle.y + (this.vecPunchWeaponAngle.y - vecPunchWeaponAngle.y) * options.percentage;
        localPlayer.viewAngle.delta(new app.core.VectorData(x, y, viewAngle.z));
        this.vecPunchWeaponAngle = vecPunchWeaponAngle;
      }
    }
  }
}

export type IRecoilOptions = {
  percentage: number      // 0 <-> 1
}
