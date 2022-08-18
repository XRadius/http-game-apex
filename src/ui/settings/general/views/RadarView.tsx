import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const RadarView = ui.createView<{vm: app.RadarViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.generalRadar}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.generalRadarItems}
      control={<ui.material.Switch
        onChange={x => vm.showItems.change(x.target.checked)}
        checked={vm.showItems.value} />} />
    <ui.material.FormControlLabel
      label={app.language.generalRadarPlayers}
      control={<ui.material.Switch
        onChange={x => vm.showPlayers.change(x.target.checked)}
        checked={vm.showPlayers.value} />} />
  </ui.material.FormGroup>
));
