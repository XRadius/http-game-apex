import * as app from '.';
import {coreOffsets} from './offsets/coreOffsets';

export class Core {
  readonly entityList = new app.EntityList(this.address + coreOffsets.clEntityList, this.channel);
  readonly levelName = new app.LevelName(this.address + coreOffsets.levelName);
  readonly localPlayer = new app.LocalPlayer(this.address + coreOffsets.localPlayer);

  private constructor(
    private readonly address: bigint,
    private readonly channel: app.api.Channel) {
    this.channel.create(this.entityList);
    this.channel.create(this.levelName);
    this.channel.create(this.localPlayer);
  }

  static async createAsync(server: app.api.Server) {
    const processes = await server.processesAsync();
    const targetProcess = processes.find(x => x.command.toLowerCase().endsWith('r5apex.exe'));
    if (!targetProcess) throw new Error('Invalid process!');
    const regions = await targetProcess.regionsAsync();
    const targetRegion = regions.find(x => x.pathname.toLowerCase().endsWith('r5apex.exe'))
      ?? regions.find(x => x.perms == 0x1 && x.pathname.startsWith('/memfd'))
      ?? regions.find(x => x.start === BigInt(0x140000000));
    if (!targetRegion) throw new Error('Invalid region!');
    return new Core(targetRegion.start, new app.api.Channel(targetProcess.pid));
  }

  async runAsync(renderFrame: () => void) {
    await this.channel.runAsync(renderFrame);
  }
}
