import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { darken, readableColor } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';
import { SecreteParent } from './SecreteParent';
import { useSmartOutline } from '../hooks/useSmartOutline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: ColorPaletteColor;
}

const InputContainer = styled.div`
  padding: ${props => props.theme.grid.spaceS};
  display: inline-flex;
  flex-direction: column;
`;

interface InputLabelProps {
  color: ColorPaletteColor;
}

const InputLabel = styled.label<InputLabelProps>`
  padding: ${props => `${props.theme.grid.spaceS} 0`};
  margin: ${props => `${props.theme.grid.spaceS} 0`};
  display: flex;
  justify-content: center;

  font-family: ${props => props.theme.fonts.heading};

  background-color: ${props => darken(0.1, props.theme.color[props.color])};

  color: ${props =>
    readableColor(
      props.theme.color[props.color],
      props.theme.color.dark,
      props.theme.color.light
    )};

  position: relative;
  z-index: 1;

  &::before {
    content: ' ';
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: calc(100% + 2px);
    top: -2px;
    left: 0;
    z-index: -1;
    border-bottom: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
    border-top: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
  }
`;

interface InputBaseProps {
  isTabbing: boolean;
  color: ColorPaletteColor;
}

const InputBase = styled.input<InputBaseProps>`
  border-bottom: ${props =>
    `1px solid ${darken(0.1, props.theme.color[props.color])}`};
  border-top: ${props =>
    `1px solid ${darken(0.1, props.theme.color[props.color])}`};

  color: ${props => darken(0.1, props.theme.color[props.color])};
  background-color: ${props => props.theme.color.light};

  &:focus {
    ${props =>
      props.isTabbing
        ? `outline: ${props.theme.color[props.color]} auto 5px;`
        : 'outline: none'}
  }
`;

export const Input: React.FC<PropsWithChildren<InputProps>> = ({
  id,
  label,
  color = 'flair',
  ...props
}) => {
  const isTabbing = useSmartOutline();
  return (
    <InputContainer>
      <SecreteParent style={{ margin: 0 }}>
        <InputLabel htmlFor={id} color={color}>
          {label}
        </InputLabel>
      </SecreteParent>
      <InputBase
        aria-label={label}
        id={id}
        {...props}
        color={color}
        isTabbing={isTabbing}
      />
    </InputContainer>
  );
};
