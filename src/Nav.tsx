import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Nav = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">L5R Dice Simulator</Typography>
    </Toolbar>
  </AppBar>
);
