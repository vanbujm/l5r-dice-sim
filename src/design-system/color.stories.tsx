import React from 'react';
import styled from 'styled-components';
import { color } from './theme';

const Palette = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ color }) => color};
  padding: 1rem;
  border-radius: 1rem;
`;

const ColorSwath = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: ${({ color }) => color};
  border-radius: 0.5rem;
  margin: 0.25rem;
`;

const ColorPaletteContainer = styled.div`
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
`;

const ColorSwathContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ColorPalette = () => (
  <ColorPaletteContainer>
    <Palette color="white">
      {Object.entries(color).map(([key, value]) => (
        <ColorSwathContainer key={key}>
          <h4 style={{ margin: '0.25rem' }}>{key}</h4>
          <ColorSwath color={value} />
        </ColorSwathContainer>
      ))}
    </Palette>
    <Palette color="#2c2c2c">
      {Object.entries(color).map(([key, value]) => (
        <ColorSwathContainer key={key}>
          <h4 style={{ color: 'white', margin: '0.25rem' }}>{key}</h4>
          <ColorSwath color={value} />
        </ColorSwathContainer>
      ))}
    </Palette>
  </ColorPaletteContainer>
);

export default {
  component: ColorPalette,
  title: 'Colors'
};
