import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');

ui((x) => {
  container.style.display = 'inherit';
  content.textContent = 'Sense running. Keep this window open.';
  return renderAsync(x, new app.features.Sense());
});

async function renderAsync(core: app.core.Core, sense: app.features.Sense) {
  await core.runAsync(() => {
    const players = core.playerList.value;
    const localPlayer = players.find(x => x.address === core.localPlayer.value);
    if (localPlayer) sense.updateStates(localPlayer, players);
  });
}
