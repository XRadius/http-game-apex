import * as app from '..';

export class Sense {
  constructor(
    private readonly core: app.Core,
    private readonly maximumDistance = 200) {}

  async updateAsync(localPlayer: app.Player, players: Array<app.Player>, mode?: string) {
    const pointers: Array<app.Pointer> = [];
    this.collectChanges(localPlayer, players, pointers, mode);
    await this.core.process.batch(pointers).writeAsync();
  }

  private collectChanges(localPlayer: app.Player, players: Array<app.Player>, pointers: Array<app.Pointer>, mode?: string) {
    for (const x of players) {
      if (x.isSameTeam(localPlayer, mode) || [0, 255].includes(x.glowEnable.value)) continue;
      const dx = (localPlayer.localOrigin.value.x - x.localOrigin.value.x) * 0.0254;
      const dy = (localPlayer.localOrigin.value.y - x.localOrigin.value.y) * 0.0254;
      const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if (r < this.maximumDistance) {
        const glowEnable = 7;
        const glowThroughWalls = 2;
        if (x.glowEnable.value !== glowEnable || x.glowThroughWalls.value !== glowThroughWalls) {
          x.glowEnable.value = glowEnable;
          x.glowThroughWalls.value = glowThroughWalls;
          pointers.push(x.glowEnable, x.glowThroughWalls);
        }
      }
    }
  }
}
