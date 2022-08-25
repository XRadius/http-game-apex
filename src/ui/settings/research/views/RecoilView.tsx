import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const RecoilView = ui.createView<{vm: app.RecoilViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {app.language.researchRecoil}
    </ui.material.Typography>
    <ui.material.FormControlLabel
      label={app.language.researchRecoilEnable}
      control={<ui.material.Switch
        onChange={x => vm.enable.change(x.target.checked)}
        checked={vm.enable.value} />} />
    <ui.material.Box sx={styles.sliderLabel}>
      <ui.material.Typography>
        {app.language.researchRecoilPercentage}
      </ui.material.Typography>
      <ui.material.Box sx={styles.sliderValue}>
        {vm.percentage.value}
      </ui.material.Box>
    </ui.material.Box>
    <ui.material.Slider
      onChange={(_, x) => vm.percentage.change(Number(x))}
      value={vm.percentage.value}
      min={0} max={1} step={0.01} />
  </ui.material.FormGroup>
));

const styles = {
  sliderLabel: {
    position: 'relative'
  },
  sliderValue: {
    position: 'absolute',
    right: 0,
    top: 0
  }
};
