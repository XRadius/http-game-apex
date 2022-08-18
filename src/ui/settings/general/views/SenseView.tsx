import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const SenseView = ui.createView<{vm: app.SenseViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h5">
      {app.language.generalSense}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.generalSenseItems}
      control={<ui.material.Switch
        onChange={x => vm.highlightItems.change(x.target.checked)}
        checked={vm.highlightItems.value} />} />
    <ui.material.FormControlLabel
      label={app.language.generalSensePlayers}
      control={<ui.material.Switch
        onChange={x => vm.highlightPlayers.change(x.target.checked)}
        checked={vm.highlightPlayers.value} />} />
  </ui.material.FormGroup>
));
