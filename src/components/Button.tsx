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
  box-sizing: border-box;
  padding: ${({ theme: { grid } }) => `${grid.spaceS} ${grid.spaceM}`};

  background: ${props => props.theme.color.light};
  color: ${props => darken(0.1, props.theme.color[props.color])};
  font-family: ${props => props.theme.fonts.text};
  font-size: ${props => props.theme.sizes.h6};
  font-weight: bold;

  border: ${props =>
    `2px solid ${darken(0.1, props.theme.color[props.color])}`};

  position: relative;
  z-index: 1;

  &:active {
    color: ${props => props.theme.color.light};
    background: ${props => props.theme.color[props.color]};
  }

  &:hover {
    background: ${props => lighten(0.05, props.theme.color.light)};
  }

  &:active:hover {
    background: ${props => props.theme.color[props.color]};
  }

  &:focus {
    ${props =>
      props.isTabbing
        ? `outline: ${props.theme.color[props.color]} auto 5px;`
        : 'outline: none'}
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorPaletteColor;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  color = 'success',
  ...props
}) => {
  const isTabbing = useSmartOutline();

  return (
    <SecreteParent>
      <ButtonBase isTabbing={isTabbing} color={color} {...props}>
        {children}
      </ButtonBase>
    </SecreteParent>
  );
};
