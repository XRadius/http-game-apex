import * as mobx from 'mobx';

export class BoolStorage {
  constructor(private readonly key: string, defaultValue: boolean) {
    const value = localStorage.getItem(key);
    this.value = value ? /^true$/i.test(value) : defaultValue;
    mobx.makeObservable(this);
  }

  @mobx.action
  change(value: boolean) {
    this.value = value;
    localStorage.setItem(this.key, String(this.value));
  }

  @mobx.observable
  value: boolean;
}
