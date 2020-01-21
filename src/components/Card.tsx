import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { darken, desaturate, lighten } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';

interface StyleProps {
  color: ColorPaletteColor;
}

const CardBase = styled.div<StyleProps>`
  display: flex;
  justify-content: center;

  padding: ${({ theme: { grid } }) => `${grid.spaceM}`};

  background-color: ${props => lighten(0.5, props.theme.color[props.color])};
  box-shadow: inset 0 0 ${({ theme: { grid } }) => `${grid.spaceM}`}
    ${({ theme: { grid } }) => `${grid.spaceXs}`}
    ${props => lighten(0.3, desaturate(0.05, props.theme.color[props.color]))};
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
  display: inline-block;
`;

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  color = 'success'
}) => {
  return (
    <SecreteParent>
      <CardBase color={color}>
        <ContentContainer>{children}</ContentContainer>
      </CardBase>
    </SecreteParent>
  );
};
