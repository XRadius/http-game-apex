import * as ui from 'ui';

export class RadarViewModel {
  readonly showItems = new ui.BoolStorage('settings.radar.showItems', false);
  readonly showPlayers = new ui.BoolStorage('settings.radar.showPlayers', true);
}
