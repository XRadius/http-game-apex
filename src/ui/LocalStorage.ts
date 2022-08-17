import * as mobx from 'mobx';

export class LocalStorage<T extends string> {
  constructor(private readonly key: string, defaultValue: T | boolean) {
    const value = localStorage.getItem(key);
    this.value = (value ? value : String(defaultValue)) as T;
    mobx.makeObservable(this);
  }

  @mobx.action
  change(value: T | boolean) {
    this.value = String(value) as T;
    localStorage.setItem(this.key, this.value);
  }

  @mobx.computed
  get checked() {
    return /^true$/i.test(this.value);
  };

  @mobx.observable
  value: T;
}
