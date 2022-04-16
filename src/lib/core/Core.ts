import * as app from '..';
import {coreOffsets} from './offsets/coreOffsets';
const maxPlayers = Array(60).fill(0).map((_, i) => i);

export class Core {
  private constructor(
    private readonly process: app.Process,
    private readonly region: app.Region) {}

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
    const levelNamePointer = new app.Pointer(this.region.start + coreOffsets.levelName, 32);
    await this.process.resolveAsync(levelNamePointer);
    return app.CString.from(levelNamePointer.buffer);
  }

  async playersAsync() {
    const localPlayerPointer = new app.Pointer(this.region.start + coreOffsets.localPlayer, 1 << 5);
    const playerPointers = maxPlayers.map(x => new app.Pointer(this.region.start + coreOffsets.clEntityList + BigInt(x << 5), 0x8));
    await this.process.resolveAsync(localPlayerPointer, playerPointers);
    const localPlayerAddress = localPlayerPointer.buffer.getBigUint64(0, true);
    const playerAddresses = playerPointers.map(x => x.buffer.getBigUint64(0, true)).filter(Boolean);
    const players = playerAddresses.map(x => app.PlayerFactory.create(x, localPlayerAddress === x));
    await this.process.resolveAsync(pointersOf(players));
    return players.map(x => x.build());
  }
}

function pointersOf(players: Array<app.PlayerFactory>): Array<app.Pointer> {
  return players.flatMap(x => Object.values(x).filter(y => y instanceof app.Pointer));
}
