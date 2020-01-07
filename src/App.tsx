import React from 'react';
import { Nav } from './Nav';
import { Container } from '@material-ui/core';
import { SimulateRoll } from './SimulateRoll';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <Container>
          <SimulateRoll />
        </Container>
      </main>
    </>
  );
};

export default App;
