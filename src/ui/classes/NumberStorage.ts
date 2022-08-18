import * as mobx from 'mobx';

export class NumberStorage {
  constructor(private readonly key: string, defaultValue: number) {
    const value = localStorage.getItem(key);
    this.value = value ? Number(value) : defaultValue;
    mobx.makeObservable(this);
  }

  @mobx.action
  change(value: number) {
    this.value = value;
    localStorage.setItem(this.key, String(this.value));
  }

  @mobx.observable
  value: number;
}
