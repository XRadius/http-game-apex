import * as app from '.';
import * as React from 'react';
import * as ui from 'ui';

export const MainView = ui.createView<{vm: app.MainViewModel}>(({vm}) => (
  <React.Fragment>
    <ui.material.Typography variant="h5">
      {app.language.research}
    </ui.material.Typography>
    <ui.material.Alert severity="warning">
      {app.language.researchWarning}
    </ui.material.Alert>
    <app.RecoilView vm={vm.recoil} />
  </React.Fragment>
));
