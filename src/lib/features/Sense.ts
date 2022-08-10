import * as app from '..';

export class Sense {
  constructor(
    private readonly maximumDistance = 200) {}

  updateItems(localPlayer: app.core.Player, items: Iterable<app.core.Item>) {
    for (const item of items) {
      if (!item.hasColor || !this.inRange(localPlayer, item.localOrigin)) continue;
      item.highlightFunctionBits.value = 0x5C408A89;
    }
  }
  
  updatePlayers(localPlayer: app.core.Player, players: Iterable<app.core.Player>) {
    for (const player of players) {
      if (!player.isValid || player.isSameTeam(localPlayer) || !this.inRange(localPlayer, player.localOrigin)) continue;
      player.glowEnable.value = 7;
      player.glowThroughWalls.value = 2;
    }
  }

  private inRange(localPlayer: app.core.Player, origin: app.core.Vector) {
    const dx = (localPlayer.localOrigin.value.x - origin.value.x) * 0.0254;
    const dy = (localPlayer.localOrigin.value.y - origin.value.y) * 0.0254;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) < this.maximumDistance;
  }
}
