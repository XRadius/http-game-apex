import 'reflect-metadata';
import * as mobx from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from 'ui';
import {Runner} from './Runner';
const packageData = require('../package');

function App() {
  return (
    <ui.material.ThemeProvider theme={theme}>
      <ui.material.CssBaseline />
      <ui.MainView vm={ui.MainViewModel.create(Runner.create())} />
    </ui.material.ThemeProvider>
  );
}

const theme = ui.material.createTheme({
  palette: {
    mode: 'dark',
    primary: {main: '#4CAF50'}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: '#333'
        },
        body: {
          backgroundColor: '#333',
        },
        canvas: {
          display: 'none', 
          position: 'fixed'
        },
        '::-webkit-scrollbar': {
          width: '12px'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#333'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#4CAF50',
          border: '4px solid #333',
          borderRadius: '12px'
        }
      }
    }
  }
});

(function() {
  document.title = `${packageData.name} (${packageData.version})`;
  mobx.configure({enforceActions: 'never'});
  ReactDOM.render(<App />, document.getElementById('container'));
})();
