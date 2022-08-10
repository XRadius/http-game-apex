import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const map = new app.features.Map(canvas);

canvas.addEventListener('dblclick', () => {
  (document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()).catch();
});

ui(x => renderAsync(x).finally(() => {
  canvas.height = 0;
  canvas.width = 0;
}));

async function renderAsync(core: app.core.Core) {
  await core.runAsync(() => {
    const localPlayer = core.playerList.get(core.localPlayer.value);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    renderFrame(core, localPlayer),
    updateSense(core, localPlayer);
  });
}

function renderFrame(core: app.core.Core, localPlayer?: app.core.Player) {
  map.refresh(core.levelName.value);
  if (!localPlayer) return;
  map.renderPlayers(localPlayer, core.playerList.values());
}

function updateSense(core: app.core.Core, localPlayer?: app.core.Player) {
  if (!localPlayer || !location.hash.includes('enable-sense')) return;
  const sense = new app.features.Sense();
  sense.updateItems(localPlayer, core.itemList.values());
  sense.updatePlayers(localPlayer, core.playerList.values());
}
