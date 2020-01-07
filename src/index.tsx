import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { muiTheme, theme } from './theme';

const WrappedApp = () => (
  <>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </>
);

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(<WrappedApp />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<WrappedApp />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
