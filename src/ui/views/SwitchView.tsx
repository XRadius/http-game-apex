import * as React from 'react';
import * as ui from 'ui';

export const SwitchView = ui.createView<{vm: ui.MainViewModel}>(({vm}) => {
  switch (vm.currentView) {
    case 1:
      return <ui.areas.settings.MainView vm={vm.settings} />;
    default:
      return <ui.areas.main.MainView />;
  }
});
