import React from 'react';
import { Button } from '../components/Button';
import styled from 'styled-components';
import { Card as CardComponent } from '../components/Card';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { TopBar } from '../components/TopBar';
import { Accordion, AccordionItem } from '../components/Accordion';

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
    <TopBar>
      <Heading type="h1" color="light">
        Title
      </Heading>
    </TopBar>
  </NavContainer>
);

export const Accordions = () => (
  <ComponentContainer>
    <Accordion>
      <AccordionItem label="Accordion Item 1">
        <Text color="success">Hidden accordion text</Text>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem label="Accordion Card Item 1" card>
        <Text color="success">Hidden accordion text</Text>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem label="Accordion Item 1" color="important">
        <Text color="important">Hidden accordion text 1</Text>
      </AccordionItem>
      <AccordionItem label="Accordion Item 2" color="important">
        <Text color="important">Hidden accordion text 2</Text>
      </AccordionItem>
    </Accordion>
  </ComponentContainer>
);

export default {
  title: 'Components'
};
