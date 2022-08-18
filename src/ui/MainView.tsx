import * as React from 'react';
import * as ui from 'ui';
import Close from '@mui/icons-material/Close';
import Settings from '@mui/icons-material/Settings';

export const MainView = ui.createView<{vm: ui.MainViewModel}>(({vm}) => (
  <ui.material.Box sx={styles.container}>
    {vm.hasError && <ui.material.Box sx={styles.error}>
      <ui.material.Typography>
        {vm.errorMessage}
      </ui.material.Typography>
      <ui.material.Button onClick={() => vm.connectAsync()}>
        {ui.language.reconnect}
      </ui.material.Button>
    </ui.material.Box>}
    {vm.isLoading && <ui.material.Backdrop open>
      <ui.material.CircularProgress sx={styles.progress} />
    </ui.material.Backdrop>}
    {!vm.hasError && !vm.isLoading && <React.Fragment>
      {vm.showSettings
        ? <ui.settings.MainView vm={vm.settings} />
        : <ui.main.MainView />}
      <ui.material.IconButton sx={styles.toggle} onClick={() => vm.toggleSettings()}>
        {vm.showSettings ? <Close /> : <Settings />}
      </ui.material.IconButton>
    </React.Fragment>}
  </ui.material.Box>
));

const styles = {
  container: {
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    userSelect: 'none'
  },
  error: {
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  progress: {
    position: 'fixed',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)'
  },
  toggle: {
    position: 'fixed',
    right: '12px',
    top: '12px'
  }
};
