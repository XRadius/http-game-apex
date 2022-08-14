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
      this.status.isLoading = true;
      const server = new app.api.Server();
      const version = await server.versionAsync();
      if (!version) {
        this.status.change(ui.language.errorDriver);
      } else if (version !== app.api.VERSION) {
        this.status.change(ui.language.errorVersion);
      } else if (!await this.startAsync(server)) {
        this.status.change(ui.language.errorProcess);
      } else {
        this.status.reset();
      }
    } catch (err) {
      this.disconnect(err);
    } finally {
      this.status.isLoading = false;
    }
  }

  @mobx.action
  changeView(view: number) {
    this.currentView = view;
  }

  @mobx.action
  toggleView() {
    this.currentView = Number(!this.currentView);
  }

  @mobx.observable
  currentView = 0;

  @mobx.observable
  readonly settings = new ui.areas.settings.MainViewModel();

  @mobx.observable
  readonly status = new ui.StatusViewModel(this);
  
  @mobx.action
  private disconnect(reason: unknown) {
    this.status.change(ui.language.error);
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
