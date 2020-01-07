import React from 'react';
import { Nav } from './Nav';
import { Container } from '@material-ui/core';
import { SimulateRoll } from './SimulateRoll';
import { AverageRoll } from './AverageRoll';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <Container maxWidth="sm">
          <SimulateRoll />
          <AverageRoll />
        </Container>
      </main>
    </>
  );
};

export default App;
