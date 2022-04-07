import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const frameTime = 1000 / 30;
const radar = new app.Radar(canvas);

canvas.addEventListener('dblclick', () => {
  (document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()).catch();
});

ui(async (controller, core, mode) => {
  while (!controller.signal.aborted) await renderAsync(core, mode);
  canvas.height = 0;
  canvas.width = 0;
});

async function renderAsync(core: app.Core, mode?: string) {
  const beginTime = Date.now();
  const [levelName, players] = await Promise.all([core.levelNameAsync(), core.playersAsync()]);
  const localPlayer = players.find(x => x.isLocal);
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  renderFrame(levelName, localPlayer, players, mode);
  await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
}

function renderFrame(levelName: app.CString, localPlayer: app.Player | undefined, players: Array<app.Player>, mode?: string) {
  switch (levelName) {
    case 'mp_rr_canyonlands_staging':
      radar.clear();
      if (!localPlayer) break;
      radar.renderOne(localPlayer, new app.Vector(31482.994140625, -6708.69677734375, 0), '#FFF');
      break;
    default:
      radar.clear();
      if (!localPlayer) break;
      radar.renderAll(localPlayer, players, mode);
      break;
  }
}
