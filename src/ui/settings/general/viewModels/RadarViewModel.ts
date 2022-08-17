import * as ui from 'ui';

export class RadarViewModel {
  readonly showItems = new ui.LocalStorage('settings.radar.showItems', false);
  readonly showPlayers = new ui.LocalStorage('settings.radar.showPlayers', true);
}
