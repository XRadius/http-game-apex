import * as ui from 'ui';

export class MapViewModel {
  readonly showItems = new ui.BoolStorage('settings.map.showItems', false);
  readonly showPlayers = new ui.BoolStorage('settings.map.showPlayers', true);
}
