import React from 'react';
import { TopBar } from './components/TopBar';
import { Heading } from './components/Heading';

export const Nav = () => (
  <TopBar>
    <Heading type="h1" color="light">
      L5R Dice Simulator
    </Heading>
  </TopBar>
);
