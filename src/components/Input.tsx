import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { darken, readableColor } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';
import { SecreteParent } from './SecreteParent';
import { useSmartOutline } from '../hooks/useSmartOutline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: ColorPaletteColor;
  inputStyles?: CSSProperties;
  containerStyles?: CSSProperties;
  aside?: ReactNode;
}

const InputContainer = styled.div`
  padding: ${props => props.theme.grid.spaceS};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface InputLabelProps {
  color: ColorPaletteColor;
}

const InputLabel = styled.label<InputLabelProps>`
  padding: ${props => `${props.theme.grid.spaceS}`};
  margin: ${props => `${props.theme.grid.spaceS} 0`};
  display: flex;
  justify-content: flex-start;

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
  width: 100%;

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

const CenteringDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Input: React.FC<PropsWithChildren<InputProps>> = ({
  id,
  label,
  color = 'secondary',
  style,
  inputStyles,
  containerStyles,
  aside,
  ...props
}) => {
  const isTabbing = useSmartOutline();
  return (
    <InputContainer style={containerStyles}>
      <SecreteParent style={{ margin: 0 }}>
        <InputLabel htmlFor={id} color={color} style={style}>
          {label}
        </InputLabel>
      </SecreteParent>
      <CenteringDiv>
        <InputBase
          aria-label={label}
          id={id}
          {...props}
          color={color}
          style={inputStyles}
          isTabbing={isTabbing}
        />
        {aside}
      </CenteringDiv>
    </InputContainer>
  );
};
