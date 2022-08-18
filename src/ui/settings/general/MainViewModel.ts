import * as app from '.';
import * as ui from 'ui';

export class MainViewModel {
  readonly map = new app.MapViewModel();
  readonly radar = new app.RadarViewModel();
  readonly sense = new app.SenseViewModel();
  readonly viewType = new ui.StringStorage<app.MainType>('settings.viewType', app.MainType.Radar);
}
