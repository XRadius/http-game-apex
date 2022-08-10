import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');

ui((x) => {
  container.style.display = 'inherit';
  content.textContent = 'Sense running. Keep this window open.';
  return renderAsync(x);
});

async function renderAsync(core: app.core.Core) {
  await core.runAsync(() => {
    const localPlayer = core.playerList.get(core.localPlayer.value);
    updateSense(core, localPlayer);
  });
}

function updateSense(core: app.core.Core, localPlayer?: app.core.Player) {
  if (!localPlayer) return;
  const sense = new app.features.Sense();
  sense.updateItems(localPlayer, core.itemList.values());
  sense.updatePlayers(localPlayer, core.playerList.values());
}
