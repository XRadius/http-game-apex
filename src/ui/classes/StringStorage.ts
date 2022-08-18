import * as mobx from 'mobx';

export class StringStorage<T extends string = string> {
  constructor(private readonly key: string, defaultValue: T) {
    const value = localStorage.getItem(key);
    this.value = (value ? value : defaultValue) as T;
    mobx.makeObservable(this);
  }

  @mobx.action
  change(value: T) {
    this.value = value;
    localStorage.setItem(this.key, this.value);
  }

  @mobx.observable
  value: T;
}
