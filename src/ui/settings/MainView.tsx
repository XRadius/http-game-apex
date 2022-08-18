import * as app from '.';
import * as React from 'react';
import * as ui from 'ui';
import FilterList from '@mui/icons-material/FilterList';
import Science from '@mui/icons-material/Science';
import Settings from '@mui/icons-material/Settings';

export const MainView = ui.createView<{vm: app.MainViewModel}>(({vm}) => (
  <ui.material.Box sx={styles.container}>
    <SwitchView vm={vm} />
    <ui.material.Paper sx={styles.navigation} square={true}>
      <ui.material.Divider />
      <ui.material.BottomNavigation showLabels value={vm.currentView}>
        <ui.material.BottomNavigationAction sx={styles.navigationAction}
          onClick={() => vm.changeView(0)}
          icon={<Settings />}
          label={app.language.general} />
        <ui.material.BottomNavigationAction sx={styles.navigationAction}
          onClick={() => vm.changeView(1)}
          icon={<FilterList />}
          label={app.language.items} />
        <ui.material.BottomNavigationAction sx={styles.navigationAction}
          onClick={() => vm.changeView(2)}
          icon={<Science />}
          label={app.language.research} />
      </ui.material.BottomNavigation>
    </ui.material.Paper>
  </ui.material.Box>
));

const SwitchView = ui.createView<{vm: app.MainViewModel}>(({vm}) => {
  switch (vm.currentView) {
    case 1: return <app.items.MainView vm={vm.items} />;
    case 2: return <app.research.MainView vm={vm.research} />;
    default: return <app.general.MainView vm={vm.general} />;
  }
});

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '384px',
    padding: '16px',
    paddingBottom: '56px'
  },
  navigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
  navigationAction: {
    maxWidth: '128px'
  }
};
