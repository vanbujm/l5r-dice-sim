import React from 'react';
import { Nav } from './Nav';
import { Container } from '@material-ui/core';
import { SimulateRoll } from './SimulateRoll';
import { AverageRoll } from './AverageRoll';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="sm" component="main">
        <SimulateRoll />
        <AverageRoll />
      </Container>
    </>
  );
};

export default App;
