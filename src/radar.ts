import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const radar = new app.features.Radar(canvas);

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
  switch (levelName) {
    case 'mp_rr_canyonlands_staging':
      radar.refresh();
      if (!localPlayer) break;
      radar.renderOne(localPlayer, {x: 31482.994140625, y: -6708.69677734375, z: 0}, '#FFF');
      break;
    default:
      radar.refresh();
      if (!localPlayer) break;
      radar.renderAll(localPlayer, players);
      break;
  }
}

function updateSense(localPlayer: app.core.Player | undefined, players: Array<app.core.Player>, sense: app.features.Sense) {
  if (!localPlayer) return;
  if (!location.hash.includes('enable-sense')) return;
  sense.updateStates(localPlayer, players);
}
