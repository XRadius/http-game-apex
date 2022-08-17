import * as ui from 'ui';

export class SenseViewModel {
  readonly highlightItems = new ui.LocalStorage('settings.sense.highlightItems', false);
  readonly highlightPlayers = new ui.LocalStorage('settings.sense.highlightPlayers', false);
}
