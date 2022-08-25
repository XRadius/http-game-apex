import * as lib from 'lib';
import * as mobx from 'mobx';
import * as ui from 'ui';

export class RecoilViewModel {
  readonly enable = new ui.BoolStorage('settings.recoil.enable', false);
  readonly percentage = new ui.NumberStorage('settings.recoil.percentage', 0.75);

  constructor() {
    mobx.makeObservable(this);
    mobx.autorun(this.updateOptions.bind(this));
  }
  
  @mobx.observable
  options?: lib.features.IRecoilOptions;

  private updateOptions() {
    this.options = {
      percentage: this.percentage.value
    };
  }
}
