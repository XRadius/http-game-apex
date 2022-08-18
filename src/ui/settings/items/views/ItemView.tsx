import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const ItemView = ui.createView<{vm: app.ItemViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.FormControlLabel sx={styles.label}
      label={vm.value.name}
      control={<ui.material.Switch
        onChange={y => vm.store.change(y.target.checked)}
        checked={vm.store.value} />} />
  </ui.material.FormGroup>
));

const styles = {
  label: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
};
