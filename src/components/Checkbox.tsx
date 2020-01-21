import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ColorPaletteColor } from '../design-system/theme-types';
import { useSmartOutline } from '../hooks/useSmartOutline';
import { darken, readableColor } from 'polished';
import { SecreteParent } from './SecreteParent';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  color?: ColorPaletteColor;
}

interface InputContainerProps {
  color: ColorPaletteColor;
}

const InputContainer = styled.div<InputContainerProps>`
  padding: calc(${props => props.theme.grid.spaceS} - 4px) ${props => props.theme.grid.spaceS};
  display: inline-flex;
  align-items: center;
  background-color: ${props => darken(0.1, props.theme.color[props.color])};

  line-height: 1.5rem;

  &::before {
    content: ' ';
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: calc(100% + 2px);
    top: -2px;
    left: 0;
    border-bottom: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
    border-top: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
  }
`;

interface InputLabelProps {
  color: ColorPaletteColor;
}

const InputLabel = styled.label<InputLabelProps>`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props =>
    readableColor(
      props.theme.color[props.color],
      props.theme.color.dark,
      props.theme.color.light
    )};

  user-select: none;

  position: relative;
  display: inline-block;

  padding-left: 1.625rem;

  &::before,
  &::after {
    position: absolute;
    content: '';
    display: inline-block;
  }

  &::before {
    height: 1rem;
    width: 1rem;

    border: 1px solid;
    left: 0px;
    top: 3px;
  }
  &::after {
    height: 5px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;

    transform: rotate(-45deg);

    left: 4px;
    top: 7px;
  }
`;

interface InputBaseProps {
  isTabbing: boolean;
  color: ColorPaletteColor;
}

const InputBase = styled.input<InputBaseProps>`
  opacity: 0;
  position: absolute;

  /*Hide the checkmark by default*/
  & + label::after {
    content: none;
  }

  /*Unhide on the checked state*/
  &:checked + label::after {
    content: '';
  }

  /*Adding focus styles on the outer-box of the fake checkbox*/
  &:focus + label::before {
    ${props =>
      props.isTabbing
        ? `outline: ${props.theme.color[props.color]} auto 5px;`
        : 'outline: none'}
  }
`;

const CheckboxSecreteParent = styled(SecreteParent)`
  margin-top: calc(${props => props.theme.grid.spaceS} + 2px);
`;

const InputWrapper = styled.div`
  display: inline-block;
  padding-top: 6px;
`;

export const Checkbox: React.FC<PropsWithChildren<InputProps>> = ({
  id,
  label,
  color = 'flair',
  ...props
}) => {
  const isTabbing = useSmartOutline();
  return (
    <InputWrapper>
      <CheckboxSecreteParent>
        <InputContainer color={color}>
          <InputBase
            id={id}
            {...props}
            color={color}
            isTabbing={isTabbing}
            type="checkbox"
          />
          <InputLabel htmlFor={id} color={color}>
            {label}
          </InputLabel>
        </InputContainer>
      </CheckboxSecreteParent>
    </InputWrapper>
  );
};
