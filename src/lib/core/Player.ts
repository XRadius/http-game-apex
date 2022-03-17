import * as app from '..';

export class Player {
  constructor(
    readonly isLocal: boolean,
    readonly bleedoutState: number,
    readonly health: number,
    readonly healthMax: number,
    readonly lifeState: number,
    readonly localOrigin: app.Vector,
    readonly shieldHealth: number,
    readonly shieldHealthMax: number,
    readonly teamNum: number,
    readonly viewAngles: app.Vector) {}

  toString() {
    return Object.entries(this)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(',')
  }
}
