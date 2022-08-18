import * as lib from 'lib';
import * as ui from 'ui';

export class ItemViewModel {
  constructor(
    readonly value: lib.items.All,
    readonly store = new ui.BoolStorage(`Items[${value.name}]`, false)) {}
}
