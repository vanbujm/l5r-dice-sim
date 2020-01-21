import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { darken, lighten } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';
import { SecreteParent } from './SecreteParent';
import { useSmartOutline } from '../hooks/useSmartOutline';

interface StyleProps {
  color: ColorPaletteColor;
  isTabbing: boolean;
}

const ButtonBase = styled.button<StyleProps>`
  cursor: pointer;
  padding: ${({ theme: { grid } }) => `${grid.spaceS} ${grid.spaceM}`};

  background: linear-gradient(
    145deg,
    ${({ theme }) => lighten(0.1, theme.color.light)},
    ${({ theme }) => darken(0.1, theme.color.light)}
  );
  color: ${props => darken(0.1, props.theme.color[props.color])};
  font-weight: bold;

  border: ${props =>
    `2px solid ${darken(0.1, props.theme.color[props.color])}`};

  position: relative;
  z-index: 1;

  &:active {
    color: ${props => props.theme.color.light};
    background: linear-gradient(
      145deg,
      ${props => darken(0.1, props.theme.color[props.color])},
      ${props => lighten(0.1, props.theme.color[props.color])}
    );
  }

  &:focus {
    ${props =>
      props.isTabbing
        ? `outline: ${props.theme.color[props.color]} auto 5px;`
        : 'outline: none'}
  }

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

interface ButtonProps {
  color?: ColorPaletteColor;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  color = 'success'
}) => {
  const isTabbing = useSmartOutline();

  return (
    <SecreteParent>
      <ButtonBase isTabbing={isTabbing} color={color}>
        {children}
      </ButtonBase>
    </SecreteParent>
  );
};
