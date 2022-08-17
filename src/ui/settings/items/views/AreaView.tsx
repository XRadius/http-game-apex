import * as app from '..';
import * as React from 'react';
import * as ui from 'ui';

export const AreaView = ui.createView<{vm: app.AreaViewModel}>(({vm}) => (
  <ui.material.FormGroup>
    <ui.material.Typography variant="h6">
      {vm.name}
    </ui.material.Typography>
    {vm.items.map(x => (
      <app.ItemView key={x.value.itemId} vm={x} />
    ))}
  </ui.material.FormGroup>
));
