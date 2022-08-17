import * as app from '.';
import * as React from 'react';
import * as ui from 'ui';

export const MainView = ui.createView<{vm: app.MainViewModel}>(({vm}) => (
  <React.Fragment>
    <ui.material.Typography variant="h5">
      {app.language.general}
    </ui.material.Typography>
    <ui.material.Typography variant="h6">
      {app.language.generalViewType}
    </ui.material.Typography>
    <ui.material.Select fullWidth
      onChange={x => vm.viewType.change(x.target.value as app.MainType)}
      value={vm.viewType.value}>
      <ui.material.MenuItem value={app.MainType.Map}>
        {app.language.generalViewTypeMap}
      </ui.material.MenuItem>
      <ui.material.MenuItem value={app.MainType.Radar}>
        {app.language.generalViewTypeRadar}
      </ui.material.MenuItem>
    </ui.material.Select>
    <app.MapView vm={vm.map} />
    <app.RadarView vm={vm.radar} />
    <app.SenseView vm={vm.sense} />
  </React.Fragment>
));
