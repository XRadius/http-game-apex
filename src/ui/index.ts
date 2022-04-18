import * as app from '../lib';
import {language} from './language';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');
const server = new app.Server();

export async function ui(mainAsync: (core: app.Core) => Promise<void>) {
  while (true) {
    await new Promise(x => setTimeout(x, 1000));   
    switch (await server.versionAsync()) {
      case 0:
        content.innerHTML = language.errorDriver;
        break;
      case 3:
        content.innerHTML = await tryAsync(mainAsync) ? language.error : language.errorProcess;
        break;
      default:
        content.innerHTML = language.errorVersion;
        break;
    }
  }
}

async function tryAsync(mainAsync: (core: app.Core) => Promise<void>) {
  const core = await app.Core.createAsync(server).catch(() => undefined);
  if (core) {
    container.style.display = 'none';
    await mainAsync(core).catch(console.error.bind(console));
    container.style.display = 'inherit';
    return true;
  } else {
    return false;
  }
}
