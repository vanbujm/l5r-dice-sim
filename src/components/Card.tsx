import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { darken, parseToRgb } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';

interface StyleProps {
  color: ColorPaletteColor;
}

const CardBase = styled.div<StyleProps>`
  display: flex;

  padding: ${({ theme: { grid } }) => `${grid.spaceM}`};

  background-image: url('photos_2018_4_23_fst_brown-blank-old-paper.jpg');
  background-color: ${props => {
    const { red, green, blue, alpha } = {
      ...parseToRgb(props.theme.color[props.color]),
      alpha: 0.1
    };
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }};
  background-blend-mode: overlay;

  max-width: ${props => props.theme.breakpoints.m};
  font-weight: bold;

  border: ${props =>
    `2px solid ${darken(0.1, props.theme.color[props.color])}`};

  position: relative;
  z-index: 1;

  &::before {
    content: ' ';
    position: absolute;
    background-color: transparent;
    width: calc(100% + 12px);
    height: calc(100% + 6px);
    top: -4px;
    left: -7px;
    z-index: -1;
    border-bottom: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
    border-top: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
  }

  &::after {
    content: ' ';
    position: absolute;
    background-color: transparent;
    width: calc(100% + 12px);
    height: calc(100%);
    top: -2px;
    left: -7px;
    z-index: -1;
    border-bottom: ${props =>
      `2px solid ${darken(0.1, props.theme.color[props.color])}`};
    border-top: ${props =>
      `2px solid ${darken(0.1, props.theme.color[props.color])}`};
  }
`;

const SecreteParent = styled.div`
  margin: ${({ theme: { grid } }) => `${grid.spaceS}`};
  position: relative;
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ColorPaletteColor;
}

const ContentContainer = styled.div`
  display: block;
  width: 100%;
`;

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  color = 'secondary'
}) => {
  return (
    <SecreteParent>
      <CardBase color={color}>
        <ContentContainer>{children}</ContentContainer>
      </CardBase>
    </SecreteParent>
  );
};
