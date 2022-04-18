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
      if (x.isLocal) continue;
      const dx = (localPlayer.localOrigin.value.x - x.localOrigin.value.x) * 0.0254;
      const dy = (localPlayer.localOrigin.value.y - x.localOrigin.value.y) * 0.0254;
      const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if (r < this.maximumDistance) {
        const color = app.Color.parse(x.createColor(localPlayer, mode), 50);
        const type = new app.EntityGlow(101, 101, 46, 90);
        if (!app.shallowEquals(x.glowColor.value, color) || !app.shallowEquals(x.glowType.value, type) || x.glowEnable.value !== 1 || x.glowThroughWalls.value !== 2) {
          x.glowColor.value = color;
          x.glowType.value = type;
          x.glowEnable.value = 1;
          x.glowThroughWalls.value = 2;
          pointers.push(x.glowColor, x.glowType, x.glowEnable, x.glowThroughWalls);
        }
      }
    }
  }
}
