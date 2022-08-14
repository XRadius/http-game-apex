import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const RadarView = ui.createView<{vm: app.RadarViewModel}>(({vm}) => vm.isVisible && (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.settingsRadar}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.settingsRadarItems}
      control={<ui.material.Switch
        onChange={x => vm.showItems.change(x.target.checked)}
        checked={vm.showItems.checked} />} />
    <ui.material.FormControlLabel
      label={app.language.settingsRadarPlayers}
      control={<ui.material.Switch
        onChange={x => vm.showPlayers.change(x.target.checked)}
        checked={vm.showPlayers.checked} />} />
  </ui.material.FormGroup>
));
