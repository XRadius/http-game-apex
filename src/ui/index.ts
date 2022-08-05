import * as app from '../lib';
import {language} from './language';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');
const server = new app.api.Server();

export async function ui(mainAsync: (core: app.core.Core) => Promise<void>) {
  while (true) {
    switch (await server.versionAsync()) {
      case 0:
        content.innerHTML = language.errorDriver;
        return;
      case 5:
        content.innerHTML = await tryAsync(mainAsync) ? language.error : language.errorProcess;
        await new Promise(x => setTimeout(x, 5000));
        break;
      default:
        content.innerHTML = language.errorVersion;
        return;
    }
  }
}

async function tryAsync(mainAsync: (core: app.core.Core) => Promise<void>) {
  const core = await app.core.Core.createAsync(server).catch(() => undefined);
  if (core) {
    container.style.display = 'none';
    await mainAsync(core).catch(console.error.bind(console));
    container.style.display = 'inherit';
    return true;
  } else {
    return false;
  }
}
