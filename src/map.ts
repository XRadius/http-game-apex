import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const map = new app.features.Map(canvas);

canvas.addEventListener('dblclick', () => {
  (document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()).catch();
});

ui(x => renderAsync(x, new app.features.Sense()).finally(() => {
  canvas.height = 0;
  canvas.width = 0;
}));

async function renderAsync(core: app.core.Core, sense: app.features.Sense) {
  await core.runAsync(() => {
    const levelName = core.levelName.value;
    const players = core.entityList.value;
    const localPlayer = players.find(x => x.address === core.localPlayer.value);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    renderFrame(levelName, localPlayer, players),
    updateSense(localPlayer, players, sense);
  });
}

function renderFrame(levelName: string, localPlayer: app.core.Player | undefined, players: Array<app.core.Player>) {
  map.refresh(levelName);
  if (!localPlayer) return;
  map.renderAll(localPlayer, players);
}

function updateSense(localPlayer: app.core.Player | undefined, players: Array<app.core.Player>, sense: app.features.Sense) {
  if (!localPlayer) return;
  if (!location.hash.includes('enable-sense')) return;
  sense.updateStates(localPlayer, players);
}
