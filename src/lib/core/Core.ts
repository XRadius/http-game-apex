import * as app from '..';
import {coreOffsets} from './offsets/coreOffsets';
const maxPlayers = Array(60).fill(0).map((_, i) => i);

export class Core {
  private constructor(
    readonly process: app.Process,
    readonly region: app.Region) {}

  static async createAsync(server: app.Server) {
    const processes = await server.processesAsync();
    const targetProcess = processes.find(x => x.command.toLowerCase().endsWith('r5apex.exe'));
    if (!targetProcess) throw new Error('Invalid process!');
    const regions = await targetProcess.regionsAsync();
    const targetRegion = regions.find(x => x.pathname.toLowerCase().endsWith('r5apex.exe'));
    if (!targetRegion) throw new Error('Invalid region!');
    return new Core(targetProcess, targetRegion);
  }

  async levelNameAsync() {
    const levelNamePointer = new app.CStringPointer(this.region.start + coreOffsets.levelName, 32);
    await this.process.batch(levelNamePointer).readAsync();
    return levelNamePointer.value;
  }

  async playersAsync() {
    const localPlayerPointer = new app.UInt64Pointer(this.region.start + coreOffsets.localPlayer);
    const playerPointers = maxPlayers.map(x => new app.UInt64Pointer(this.region.start + coreOffsets.clEntityList + BigInt(x << 5)));
    await this.process.batch(localPlayerPointer, playerPointers).readAsync();
    const localPlayerAddress = localPlayerPointer.value;
    const playerAddresses = playerPointers.map(x => x.value).filter(Boolean);
    const players = playerAddresses.map(x => new app.Player(x, localPlayerAddress === x));
    await this.process.batch(pointersOf(players)).readAsync();
    return players.filter(x => x.isValid);
  }
}

function pointersOf(players: Array<app.Player>): Array<app.Pointer> {
  return players.flatMap(x => Object.values(x).filter(y => y instanceof app.Pointer));
}
