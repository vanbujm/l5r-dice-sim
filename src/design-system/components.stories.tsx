import React from 'react';
import { Button } from '../components/Button';
import styled from 'styled-components';
import { Card as CardComponent } from '../components/Card';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { TopBar } from '../components/TopBar';

const ComponentContainer = styled.div`
  padding: 3rem;
  display: flex;
`;

export const Buttons = () => (
  <ComponentContainer>
    <Button>Success</Button>
    <Button color="important">Important</Button>
    <Button color="info">Info</Button>
  </ComponentContainer>
);

export const Card = () => (
  <>
    <CardComponent>
      <Heading type="h4">Text</Heading>
      <Text color="success">
        We're going dunny parma piker fly wire buckley's chance trackies boozer.
        Too right tucker ridgy-didge lets throw a pot op shop. Bradman veg out
        pozzy tinny dag tinny.
      </Text>
    </CardComponent>
    <CardComponent color="important">
      <Heading type="h4" color="important">
        Important Text
      </Heading>
      <Text color="important">
        Stonkered big smoke billabong blowie buck's night drongo bities frog in
        a sock. Slaps my quid bogan rapt no-hoper. Veg out good oil what's
        crackin' apples g'day shonky.
      </Text>
    </CardComponent>
  </>
);

export const Inputs = () => (
  <ComponentContainer>
    <Input label="String Input" />
    <Input label="String Input" color="important" />
    <Input label="String Input" color="success" />
    <Input label="Number Input" type="number" color="info" />
    <Checkbox label="Checkbox" id="testCheckbox" />
  </ComponentContainer>
);

const NavContainer = styled.div`
  display: flex;
  padding-bottom: 6rem;
`;

export const Navigation = () => (
  <NavContainer>
    <TopBar>Title</TopBar>
  </NavContainer>
);
export default {
  title: 'Components'
};
