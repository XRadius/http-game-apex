import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const RecoilView = ui.createView<{vm: app.RecoilViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.researchRecoil}
    </ui.material.Typography>
    <ui.material.Alert severity="info">
      {app.language.researchRecoilDescription}
    </ui.material.Alert>
    <ui.material.FormControlLabel
      label={app.language.researchRecoilEnable}
      control={<ui.material.Switch
        onChange={x => vm.enable.change(x.target.checked)}
        checked={vm.enable.value} />} />
    <ui.material.Typography variant="subtitle1">
      {app.language.researchRecoilTimer}: {vm.timer.value}ms
    </ui.material.Typography>
    <ui.material.Slider
      onChange={(_, x) => vm.timer.change(Number(x))}
      value={vm.timer.value}
      min={0} max={250} />
  </ui.material.FormGroup>
));
