import * as mobx from 'mobx';
import * as ui from 'ui';

export class StatusViewModel {
  constructor(
    private readonly mvm: ui.MainViewModel) {
    mobx.makeObservable(this);
  }

  @mobx.action
  change(message: string) {
    this.message = message;
  }

  @mobx.action
  async connectAsync() {
    await this.mvm.connectAsync();
  }

  @mobx.action
  reset() {
    this.message = '';
  }
  
  @mobx.computed
  get hasError() {
    return Boolean(this.message);
  }

  @mobx.observable
  isLoading = true;

  @mobx.observable
  message = '';
}
