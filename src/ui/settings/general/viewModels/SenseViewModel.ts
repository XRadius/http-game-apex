import * as lib from 'lib';
import * as mobx from 'mobx';
import * as ui from 'ui';

export class SenseViewModel {
  readonly highlightItems = new ui.BoolStorage('settings.sense.highlightItems', false);
  readonly highlightPlayers = new ui.BoolStorage('settings.sense.highlightPlayers', false);
  readonly longRangeMode = new ui.BoolStorage('settings.sense.longRangeMode', false);

  constructor() {
    mobx.makeObservable(this);
    mobx.autorun(this.updateOptions.bind(this));
  }

  @mobx.observable
  options?: lib.features.ISenseOptions;

  private updateOptions() {
    this.options = {
      longRangeMode: this.longRangeMode.value
    };
  }
}
