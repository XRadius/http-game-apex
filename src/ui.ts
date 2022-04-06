import * as app from './lib';
let controller: AbortController | undefined;

export function ui(coreAsync: (controller: AbortController, core: app.Core, mode?: string) => Promise<void>) {
  const be = <HTMLElement> document.querySelector('.box');
  const ce = <HTMLInputElement> document.querySelector('button[name=connect]');
  const me = <HTMLSelectElement> document.querySelector('select[name=mode]');
  const pe = <HTMLInputElement> document.querySelector('input[name=password]');
  const se = <HTMLInputElement> document.querySelector('input[name=server]');
  const ue = <HTMLInputElement> document.querySelector('input[name=username]');
  
  document.addEventListener('DOMContentLoaded', () => {
    if (!parseHashParams()) return;
    window.dispatchEvent(new Event('hashchange'));
  });

  window.addEventListener('hashchange', async () => {
    controller?.abort();
    controller = new AbortController();
    if (parseHashParams()) {
      disableInputs(true);
      await runAsync().catch(console.error.bind(console));
      disableInputs(false);
    }
  });

  ce.addEventListener('click', () => {
    location.hash = `s=${encodeURIComponent(se.value)}&` +
      `u=${encodeURIComponent(ue.value)}&` +
      `p=${encodeURIComponent(pe.value)}&` +
      `m=${encodeURIComponent(me.value)}`;
  });

  function disableInputs(disabled: boolean) {
    ce.disabled = disabled;
    me.disabled = disabled;
    pe.disabled = disabled;
    ue.disabled = disabled;
    se.disabled = disabled;
  }

  function parseHashParams() {
    const params = new URL(location.href.replace('#', '?')).searchParams;
    me.value = params.get('m') ?? '';
    pe.value = params.get('p') ?? '';
    se.value = params.get('s') ?? '';
    ue.value = params.get('u') ?? '';
    return Boolean(pe.value && se.value && ue.value);
  }

  async function runAsync() {
    const server = app.Server.create(se.value, ue.value, pe.value);
    await app.Core.createAsync(server).then(async (core) => {
      be.style.display = 'none';
      await coreAsync(controller!, core, me.value);
      be.style.display = 'inherit';
    });
  }
}
