import * as ui from 'ui';

export class MapViewModel {
  readonly showItems = new ui.LocalStorage('settings.map.showItems', false);
  readonly showPlayers = new ui.LocalStorage('settings.map.showPlayers', true);
}
