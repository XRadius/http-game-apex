import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const frameTime = 1000 / 30;
const radar = new app.Radar3(canvas);

canvas.addEventListener('dblclick', () => {
  (document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()).catch();
});

ui(x => renderAsync(x).finally(() => {
  canvas.height = 0;
  canvas.width = 0;
}));

async function renderAsync(core: app.Core) {
  while (true) {
    const beginTime = Date.now();
    const [levelName, players] = await Promise.all([core.levelNameAsync(), core.playersAsync()]);
    const localPlayer = players.find(x => x.isLocal);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    renderFrame(levelName, localPlayer, players);
    await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
  }
}

function renderFrame(levelName: app.CString, localPlayer: app.Player | undefined, players: Array<app.Player>) {
  switch (levelName) {
    case 'mp_rr_canyonlands_staging':
      radar.refresh();
      if (!localPlayer) break;
      radar.renderOne(localPlayer, new app.Vector(31482.994140625, -6708.69677734375, 0), '#FFF');
      break;
    default:
      radar.refresh();
      if (!localPlayer) break;
      radar.renderAll(localPlayer, players);
      break;
  }
}
