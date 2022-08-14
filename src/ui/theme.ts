import * as mui from '@mui/material';

export const theme = mui.createTheme({
  breakpoints: {
    values: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}
  },
  palette: {
    mode: 'dark',
    primary: {main: '#4CAF50'}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#333',
          userSelect: 'none'
        },
        'canvas': {
          display: 'none',
          position: 'fixed'
        }
      }
    }
  }
});
