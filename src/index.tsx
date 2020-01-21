import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { Reset } from './design-system/Reset';
import { GlobalStyles } from './design-system/GlobalStyle';
import { theme } from './design-system/theme';

const WrappedApp = () => (
  <>
    <Reset />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
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
serviceWorker.register();
