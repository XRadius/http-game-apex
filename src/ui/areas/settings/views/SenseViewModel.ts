import * as mobx from 'mobx';
import * as ui from 'ui';

export class SenseViewModel {
  constructor() {
    mobx.makeObservable(this);
  }

  @mobx.observable
  readonly highlightItems = new ui.LocalStorage('settings.sense.highlightItems', false);

  @mobx.observable
  readonly highlightPlayers = new ui.LocalStorage('settings.sense.highlightPlayers', false);
}
