import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const MapView = ui.createView<{vm: app.MapViewModel}>(({vm}) => vm.isVisible && (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.settingsMap}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.settingsMapItems}
      control={<ui.material.Switch
        onChange={x => vm.showItems.change(x.target.checked)}
        checked={vm.showItems.checked} />} />
    <ui.material.FormControlLabel
      label={app.language.settingsMapPlayers}
      control={<ui.material.Switch
        onChange={x => vm.showPlayers.change(x.target.checked)}
        checked={vm.showPlayers.checked} />} />
  </ui.material.FormGroup>
));
