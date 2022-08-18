import * as ui from 'ui';

export class SenseViewModel {
  readonly highlightItems = new ui.BoolStorage('settings.sense.highlightItems', false);
  readonly highlightPlayers = new ui.BoolStorage('settings.sense.highlightPlayers', false);
}
