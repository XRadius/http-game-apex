import 'reflect-metadata';
import * as mobx from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from 'ui';
import {Runner} from './Runner';
const packageData = require('../package');

function App() {
  return (
    <ui.material.ThemeProvider theme={ui.theme}>
      <ui.material.CssBaseline />
      <ui.MainView vm={ui.MainViewModel.create(Runner.create())} />
    </ui.material.ThemeProvider>
  );
}

(function() {
  document.title = `${packageData.name} (${packageData.version})`;
  mobx.configure({enforceActions: 'never'});
  ReactDOM.render(<App />, document.getElementById('container'));
})();
