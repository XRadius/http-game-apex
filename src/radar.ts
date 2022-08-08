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
    const players = core.playerList.value;
    const localPlayer = players.find(x => x.address === core.localPlayer.value);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    renderFrame(localPlayer, [...core.npcList.value, ...players]),
    updateSense(localPlayer, players, sense);
  });
}

function renderFrame(localPlayer: app.core.Player | undefined, players: Array<app.core.NPC | app.core.Player>) {
  radar.refresh();
  if (!localPlayer) return;
  radar.renderAll(localPlayer, players);
}

function updateSense(localPlayer: app.core.Player | undefined, players: Array<app.core.Player>, sense: app.features.Sense) {
  if (!localPlayer) return;
  if (!location.hash.includes('enable-sense')) return;
  sense.updateStates(localPlayer, players);
}
