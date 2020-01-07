import { createMuiTheme } from '@material-ui/core';

export interface Theme {}

export const theme: Theme = {};

export const muiTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});
