import * as app from 'lib';
import * as mobx from 'mobx';
import * as ui from 'ui';

export class MainViewModel {
  private constructor(
    private readonly renderFrame: (core: app.core.Core, vm: ui.MainViewModel) => void) {
    mobx.makeObservable(this);
  }

  static create(renderFrame: (core: app.core.Core, vm: ui.MainViewModel) => void) {
    const vm = new MainViewModel(renderFrame);
    vm.connectAsync();
    return vm;
  }

  @mobx.action
  async connectAsync() {
    try {
      this.isLoading = true;
      const server = new app.api.Server();
      const version = await server.versionAsync();
      if (!version) {
        this.errorMessage = ui.language.errorDriver;
      } else if (version !== app.api.VERSION) {
        this.errorMessage = ui.language.errorVersion;
      } else if (!await this.startAsync(server)) {
        this.errorMessage = ui.language.errorProcess;
      } else {
        this.errorMessage = '';
      }
    } catch (err) {
      this.disconnect(err);
    } finally {
      this.isLoading = false;
    }
  }

  @mobx.action
  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  @mobx.computed
  get hasError() {
    return Boolean(this.errorMessage);
  }

  @mobx.observable
  isLoading = true;

  @mobx.observable
  errorMessage = '';

  @mobx.observable
  showSettings = false;

  @mobx.observable
  readonly settings = new ui.settings.MainViewModel();

  @mobx.action
  private disconnect(reason: unknown) {
    this.errorMessage = ui.language.error;
    console.error(reason);
  }

  @mobx.action
  private async startAsync(server: app.api.Server) {
    const core = await app.core.Core
      .createAsync(server)
      .catch(() => {});
    if (core) {
      core.runAsync(() => this.renderFrame(core, this)).catch(this.disconnect.bind(this));
      return true;
    } else {
      return false;
    }
  }
}
