import * as app from '..';

export class Sense {
  constructor(
    private readonly maximumDistance = 200) {}

  updateStates(localPlayer: app.core.Player, players: Array<app.core.Player>) {
    for (const x of players) {
      if (x.isSameTeam(localPlayer) || [0, 255].includes(x.glowEnable.value)) continue;
      const dx = (localPlayer.localOrigin.value.x - x.localOrigin.value.x) * 0.0254;
      const dy = (localPlayer.localOrigin.value.y - x.localOrigin.value.y) * 0.0254;
      const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if (r < this.maximumDistance) {
        x.glowEnable.value = 7;
        x.glowThroughWalls.value = 2;
      }
    }
  }
}
