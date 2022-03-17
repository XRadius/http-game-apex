import * as app from './lib';
import {ui} from './ui';
const canvas = <HTMLCanvasElement> document.querySelector('.canvas');
const radar = new app.Radar(canvas);

canvas.addEventListener('dblclick', () => {
  (document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()).catch();
});

ui(async (main) => {
  const frameTime = 1000 / 30;
  const levelName = await main.levelNameAsync();
  while (true) {
    const beginTime = Date.now();
    const players = await main.playersAsync();
    const localPlayer = players.find(x => x.isLocal);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    renderFrame(levelName, localPlayer, players);
    await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
  }
});

function renderFrame(levelName: string, localPlayer: app.Player | undefined, players: Array<app.Player>) {
  switch (levelName) {
    case 'mp_rr_canyonlands_staging':
      radar.clear();
      if (!localPlayer) break;
      radar.renderOne(localPlayer, {x: 31482.994140625, y: -6708.69677734375}, '#FFF');
      break;
    default:
      radar.clear();
      if (!localPlayer) break;
      radar.renderAll(localPlayer, players);
      break;
  }
}
