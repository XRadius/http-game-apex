import * as React from 'react';
import * as ui from 'ui';

export const StatusView = ui.createView<{vm: ui.StatusViewModel}>(({vm}) => (
  <React.Fragment>
    {vm.hasError && <ui.material.Box sx={styles.container}>
      <ui.material.Typography>
        {vm.message}
      </ui.material.Typography>
      <ui.material.Button onClick={() => vm.connectAsync()}>
        {ui.language.reconnect}
      </ui.material.Button>
    </ui.material.Box>}
    {vm.isLoading && <ui.material.Backdrop open>
      <ui.material.CircularProgress sx={styles.progress} />
    </ui.material.Backdrop>}
  </React.Fragment>
));

const styles = {
  container: {
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
  }
};
