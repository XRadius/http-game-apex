import * as app from '.';
import * as React from 'react';
import * as ui from 'ui';

export const MainView = ui.createView<{vm: app.MainViewModel}>(({vm}) => (
  <React.Fragment>
    <ui.material.Typography variant="h5">
      {app.language.items}
    </ui.material.Typography>
    {vm.areas.map((x, i) => (
      <app.AreaView key={i} vm={x} />
    ))}
  </React.Fragment>
));
