import * as app from '..';

export class Sense {
  constructor(
    private readonly itemDefault = new app.core.GlowData(0, 110, 225, 25, true, false),
    private readonly itemHighlight = new app.core.GlowData(137, 108, 64, 0, true, false),
    private readonly maximumDistance = 200) {}

  resetItems(_: app.core.Player, items: Iterable<app.core.Item>) {
    for (const item of items) {
      if (item.highlightFunctionBits.value.isSame(this.itemHighlight)) {
        item.highlightFunctionBits.value = this.itemDefault;
      }
    }
  }

  resetPlayers(localPlayer: app.core.Player, players: Iterable<app.core.Player>) {
    for (const player of players) {
      if (player.isValid && !player.isSameTeam(localPlayer)) {
        if (this.inRange(localPlayer, player.localOrigin)) {
          /* This could be a Bloodhound scan! */
        } else if (player.glowEnable.value === 7) {
          player.glowEnable.value = 1;
          player.glowThroughWalls.value = 5;
        }
      }
    }
  }

  updateItems(localPlayer: app.core.Player, items: Iterable<app.core.Item>) {
    for (const item of items) {
      if (item.hasColor && this.inRange(localPlayer, item.localOrigin)) {
        item.highlightFunctionBits.value = this.itemHighlight;
      } else if (item.highlightFunctionBits.value.isSame(this.itemHighlight)) {
        item.highlightFunctionBits.value = this.itemDefault;
      }
    }
  }
  
  updatePlayers(localPlayer: app.core.Player, players: Iterable<app.core.Player>) {
    for (const player of players) {
      if (player.isValid && !player.isSameTeam(localPlayer)) {
        if (this.inRange(localPlayer, player.localOrigin)) {
          player.glowEnable.value = 7;
          player.glowThroughWalls.value = 2;
        } else if (player.glowEnable.value === 7) {
          player.glowEnable.value = 1;
          player.glowThroughWalls.value = 5;
        }
      }
    }
  }

  private inRange(localPlayer: app.core.Player, origin: app.core.Vector) {
    const dx = (localPlayer.localOrigin.value.x - origin.value.x) * 0.0254;
    const dy = (localPlayer.localOrigin.value.y - origin.value.y) * 0.0254;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) < this.maximumDistance;
  }
}
