import * as app from '..';
import * as mobx from 'mobx';
import * as ui from 'ui';

export class MainViewModel {
  constructor() {
    mobx.makeObservable(this);
  }

  @mobx.observable
  readonly map = new app.MapViewModel(this);

  @mobx.observable
  readonly radar = new app.RadarViewModel(this);

  @mobx.observable
  readonly sense = new app.SenseViewModel();

  @mobx.observable
  readonly viewType = new ui.LocalStorage<app.MainType>('settings.viewType', app.MainType.Radar);
}
