import * as ui from 'ui';

export class RecoilViewModel {
  readonly enable = new ui.BoolStorage('settings.recoil.enable', false);
  readonly timer = new ui.NumberStorage('settings.recoil.timer', 100);
}
