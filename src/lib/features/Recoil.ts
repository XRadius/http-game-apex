import * as app from '.';

export class Recoil {
  private vecPunchWeaponAngle = app.core.VectorData.none;

  update(localPlayer: app.core.Player, options: IRecoilOptions) {
    if (!localPlayer.viewAngle.source.syncId) {
      const vecPunchWeaponAngle = localPlayer.vecPunchWeaponAngle.value;
      const viewAngle = localPlayer.viewAngle.value;
      if (Math.abs(vecPunchWeaponAngle.x) > 0 || Math.abs(vecPunchWeaponAngle.y) > 0) {
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
