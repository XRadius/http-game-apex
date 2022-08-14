import * as React from 'react';
import * as ui from 'ui';
import Close from '@mui/icons-material/Close';
import Settings from '@mui/icons-material/Settings';

export const MainView = ui.createView<{vm: ui.MainViewModel}>(({vm}) => (
  <ui.material.Box>
    <ui.StatusView vm={vm.status} />
    {!vm.status.hasError && !vm.status.isLoading && <React.Fragment>
      <ui.material.Box>
        <ui.SwitchView vm={vm} />
      </ui.material.Box>
      <ui.material.IconButton sx={styles.button} onClick={() => vm.toggleView()}>
        {vm.currentView ? <Close /> : <Settings />}
      </ui.material.IconButton>
    </React.Fragment>}
  </ui.material.Box>
));

const styles = {
  button: {
    position: 'fixed',
    right: '12px',
    top: '12px'
  }
};
