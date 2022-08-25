import * as app from 'lib';
import * as ui from 'ui';

export class Runner {
  private constructor(
    private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement,
    private readonly map = new app.features.Map(canvas),
    private readonly radar = new app.features.Radar(canvas),
    private readonly recoil = new app.features.Recoil(),
    private readonly sense = new app.features.Sense()) {}
  
  static create() {
    const source = new Runner();
    source.attach();
    return source.run.bind(source);
  }

  run(core: app.core.Core, vm: ui.MainViewModel) {
    const localPlayer = core.playerList.get(core.localPlayer.value);
    this.updateResearch(core, vm, localPlayer);
    this.updateSense(core, vm, localPlayer);
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.update(core, vm, localPlayer);
  }

  private attach() {
    this.canvas.addEventListener('dblclick', () => {
      (document.fullscreenElement
        ? document.exitFullscreen()
        : document.body.requestFullscreen()).catch();
    });
  }

  private update(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    switch (vm.settings.general.viewType.value) {
      case ui.settings.general.MainType.Map:
        this.map.refresh(core.levelName.value);
        this.updateMap(core, vm, localPlayer);
        break;
      case ui.settings.general.MainType.Radar:
        this.radar.refresh();
        this.updateRadar(core, vm, localPlayer);
        break;
    }
  }
  
  private updateMap(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.general.map.showItems.value)
      this.map.renderItems(core.itemList.values(), vm.settings.itemSet);
    if (vm.settings.general.map.showPlayers.value && localPlayer)
      this.map.renderPlayers(localPlayer, core.playerList.values());
  }
  
  private updateRadar(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.general.radar.showItems.value && localPlayer)
      this.radar.renderItems(localPlayer, core.itemList.values(), vm.settings.itemSet);
    if (vm.settings.general.radar.showPlayers.value && localPlayer)
      this.radar.renderNpcs(localPlayer, core.npcList.values());
    if (vm.settings.general.radar.showPlayers.value && localPlayer)
      this.radar.renderPlayers(localPlayer, core.playerList.values());
  }
  
  private updateResearch(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.research.recoil.enable.value && localPlayer && vm.settings.research.recoil.options)
      this.recoil.update(core.buttonList, localPlayer, vm.settings.research.recoil.options);
  }

  private updateSense(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    const itemsFn = vm.settings.general.sense.highlightItems.value
      ? this.sense.updateItems.bind(this.sense)
      : this.sense.resetItems.bind(this.sense);
    const playersFn = vm.settings.general.sense.highlightPlayers.value
      ? this.sense.updatePlayers.bind(this.sense)
      : this.sense.resetPlayers.bind(this.sense);
    if (localPlayer) {
      itemsFn(localPlayer, core.itemList.values(), vm.settings.itemSet);
      playersFn(localPlayer, core.playerList.values());
    }
  }
}
