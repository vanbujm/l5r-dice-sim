import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Sizes } from './theme-types';

const Headings = () => (
  <>
    {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as (keyof Sizes)[]).map((v, i) => (
      <Heading type={v} key={`heading${i}`}>
        Heading {i + 1}
      </Heading>
    ))}
  </>
);

const Body = () => {
  const { grid } = useContext(ThemeContext);
  return (
    <>
      <Heading type="h4">Body</Heading>
      <Text style={{ marginBottom: grid.spaceM }}>
        Sheila ripper as busy as a larrikin cane toad divvy van beauty ten
        clicks away. Top end pokies tinny rack off cane toad dunny mozzie. Grab
        us a cut lunch home grown holy dooley cane toad spewin' he hasn't got a
        cooee.
      </Text>
      <Text style={{ marginBottom: grid.spaceM }} italic>
        Too right op shop blue pretty spiffy cut snake. Rapt kero watch out for
        the dag g'day rip snorter truckie bushie. Slacker big smoke chrissie
        rollie longneck his blood's worth bottling turps buckley's chance yobbo
        my.
      </Text>
      <Text style={{ marginBottom: grid.spaceM }} bold>
        Bathers pretty spiffy roo not my bowl of rice outback pokies pozzy kero
        spit the dummy freo. Brekkie as cross as a sook rage on garbo shazza got
        us some skite. Joey bogan holy dooley shazza got us some avos.
      </Text>
      <Text style={{ marginBottom: grid.spaceM }} bold italic>
        Jackaroo pokies brekkie flake back of bourke aussie salute. Going off
        mate oi ute pot as dry as a. Pokies jillaroo jug kero digger daks aerial
        pingpong brisvegas captain cook as cunning as a lizard drinking.
      </Text>

      <Heading type="h4" color="important">
        Important Text
      </Heading>
      <Text color="important">
        Dill boozer fairy floss fruit loop rotten frog in a sock his blood's
        worth bottling jillaroo. Slabs lippy bunyip spit the dummy counter meal
        ya. Ten clicks away beauty ocker spewin' slabs ciggies avos.
      </Text>

      <Heading type="h4" color="info">
        Information Text
      </Heading>
      <Text color="info">
        Dill boozer fairy floss fruit loop rotten frog in a sock his blood's
        worth bottling jillaroo. Slabs lippy bunyip spit the dummy counter meal
        ya. Ten clicks away beauty ocker spewin' slabs ciggies avos.
      </Text>

      <Heading type="h4" color="error">
        Error Text
      </Heading>
      <Text color="error">
        Dill boozer fairy floss fruit loop rotten frog in a sock his blood's
        worth bottling jillaroo. Slabs lippy bunyip spit the dummy counter meal
        ya. Ten clicks away beauty ocker spewin' slabs ciggies avos.
      </Text>
    </>
  );
};

export const Typography = () => (
  <>
    <div style={{ marginBottom: '2rem' }}>
      <Headings />
    </div>
    <Body />
  </>
);

export default {
  component: Typography,
  title: 'Typography'
};
