import * as app from '.';

export class Core {
  readonly levelName = new app.LevelName(this.address + app.coreOffsets.levelName);
  readonly localPlayer = new app.LocalPlayer(this.address + app.coreOffsets.localPlayer);
  readonly playerList = new app.EntityListFilter(app.Player, 'player');
  
  private constructor(
    private readonly address: bigint,
    private readonly channel: app.api.Channel,
    private readonly entityList = new app.EntityList(address + app.coreOffsets.clEntityList, channel),
    private readonly signifierList = new app.SignifierList(channel)) {
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
      ?? regions.find(x => x.perms == 1 && x.pathname.startsWith('/memfd'))
      ?? regions.find(x => x.start === BigInt(0x140000000));
    if (!targetRegion) throw new Error('Invalid region!');
    return new Core(targetRegion.start, new app.api.Channel(targetProcess.pid));
  }

  async runAsync(renderFrame: () => void) {
    await this.channel.runAsync(() => {
      this.playerList.update(this.channel, this.entityList, this.signifierList);
      renderFrame();
    });
  }
}
