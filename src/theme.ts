import { createMuiTheme } from '@material-ui/core';

export interface Theme {
  primary: string;
  secondary: string;
}

export const theme: Theme = {
  primary: '#8b33b9',
  secondary: '#6fc93b'
};

export const muiTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: theme.primary },
    secondary: { main: theme.secondary }
  }
});
