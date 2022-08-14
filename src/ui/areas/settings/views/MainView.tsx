import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const MainView = ui.createView<{vm: app.MainViewModel}>(({vm}) => (
  <ui.material.Box sx={styles.container}>
    <ui.material.Typography variant="h5">
      {app.language.settings}
    </ui.material.Typography>
    <ui.material.Typography variant="h6">
      {app.language.settingsViewType}
    </ui.material.Typography>
    <ui.material.Select fullWidth
      onChange={x => vm.viewType.change(x.target.value as app.MainType)}
      value={vm.viewType.value}>
      <ui.material.MenuItem value={app.MainType.Map}>
        {app.language.settingsViewTypeMap}
      </ui.material.MenuItem>
      <ui.material.MenuItem value={app.MainType.Radar}>
        {app.language.settingsViewTypeRadar}
      </ui.material.MenuItem>
    </ui.material.Select>
    <app.MapView vm={vm.map} />
    <app.RadarView vm={vm.radar} />
    <app.SenseView vm={vm.sense} />
  </ui.material.Box>
));

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '384px',
    padding: ui.theme.spacing(2)
  }
};
