import * as app from '..';
import * as mobx from 'mobx';
import * as ui from 'ui';

export class MapViewModel {
  constructor(
    private readonly mvm: app.MainViewModel) {
    mobx.makeObservable(this);
  }

  @mobx.computed
  get isVisible() {
    return this.mvm.viewType.value === app.MainType.Map;
  }
  
  @mobx.observable
  readonly showItems = new ui.LocalStorage('settings.map.showItems', false);

  @mobx.observable
  readonly showPlayers = new ui.LocalStorage('settings.map.showPlayers', true);
}
