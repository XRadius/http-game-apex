import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const MapView = ui.createView<{vm: app.MapViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.generalMap}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.generalMapItems}
      control={<ui.material.Switch
        onChange={x => vm.showItems.change(x.target.checked)}
        checked={vm.showItems.value} />} />
    <ui.material.FormControlLabel
      label={app.language.generalMapPlayers}
      control={<ui.material.Switch
        onChange={x => vm.showPlayers.change(x.target.checked)}
        checked={vm.showPlayers.value} />} />
  </ui.material.FormGroup>
));
