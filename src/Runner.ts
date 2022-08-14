import * as app from 'lib';
import * as ui from 'ui';

export class Runner {
  private constructor(
    private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement,
    private readonly map = new app.features.Map(canvas),
    private readonly radar = new app.features.Radar(canvas),
    private readonly sense = new app.features.Sense()) {}
  
  static create() {
    const source = new Runner();
    source.attach();
    return source.run.bind(source);
  }

  run(core: app.core.Core, vm: ui.MainViewModel) {
    const localPlayer = core.playerList.get(core.localPlayer.value);
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
    switch (vm.settings.viewType.value) {
      case ui.areas.settings.MainType.Map:
        this.map.refresh(core.levelName.value);
        this.updateMap(core, vm, localPlayer);
        break;
      case ui.areas.settings.MainType.Radar:
        this.radar.refresh();
        this.updateRadar(core, vm, localPlayer);
        break;
    }
  }
  
  private updateMap(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.map.showItems.checked)
      this.map.renderItems(core.itemList.values());
    if (vm.settings.map.showPlayers.checked && localPlayer)
      this.map.renderPlayers(localPlayer, core.playerList.values());
  }
  
  private updateRadar(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.radar.showItems.checked && localPlayer)
      this.radar.renderItems(localPlayer, core.itemList.values());
    if (vm.settings.radar.showPlayers.checked && localPlayer)
      this.radar.renderNpcs(localPlayer, core.npcList.values());
    if (vm.settings.radar.showPlayers.checked && localPlayer)
      this.radar.renderPlayers(localPlayer, core.playerList.values());
  }
  
  private updateSense(core: app.core.Core, vm: ui.MainViewModel, localPlayer?: app.core.Player) {
    if (vm.settings.sense.highlightItems.checked && localPlayer)
      this.sense.updateItems(localPlayer, core.itemList.values());
    if (vm.settings.sense.highlightPlayers.checked && localPlayer)
      this.sense.updatePlayers(localPlayer, core.playerList.values());
  }
}
