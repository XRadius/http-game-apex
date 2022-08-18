import * as app from '..';
import * as lib from 'lib';

export class AreaViewModel {
  readonly items: Array<app.ItemViewModel>;
  readonly name: string;

  constructor(name: string, selector: (item: lib.items.All) => boolean) {
    this.items = Array.from(fetch(selector)).map(x => new app.ItemViewModel(x));
    this.name = name;
  }

  toItemSet(value: Set<number>) {
    for (const entry of this.items) {
      if (!entry.store.value) continue;
      value.add(entry.value.itemId);
    }
  }
}

function *fetch(selector: (item: lib.items.All) => boolean) {
  for (const item of lib.items.list) {
    if (!selector(item)) continue;
    yield item;
  }
}
