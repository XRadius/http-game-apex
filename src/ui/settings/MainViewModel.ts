import * as app from '.';
import * as mobx from 'mobx';

export class MainViewModel {
  readonly general = new app.general.MainViewModel();
  readonly items = new app.items.MainViewModel();
  readonly research = new app.research.MainViewModel();

  constructor() {
    mobx.makeObservable(this);
    mobx.autorun(this.updateItemSet.bind(this));
  }

  @mobx.action
  changeView(view: number) {
    this.currentView = view;
  }

  @mobx.observable
  currentView = 0;

  @mobx.observable
  itemSet = new Set<number>();

  private updateItemSet() {
    const value = new Set<number>();
    this.items.toItemSet(value);
    this.itemSet = value;
    value.delete(0);
  }
}
