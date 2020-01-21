import styled from 'styled-components';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { ColorPaletteColor } from '../design-system/theme-types';
import { darken } from 'polished';

interface TextBaseProps {
  color: ColorPaletteColor;
  italic: boolean;
  bold: boolean;
}

const TextBase = styled.p<TextBaseProps>`
  color: ${props => darken(0.03, props.theme.color[props.color])};
  font-style: ${props => (props.italic ? 'italic' : 'inherit')};
  font-weight: ${props => (props.bold ? 'bold' : 'inherit')};
`;

interface TextProps extends HTMLAttributes<any> {
  color?: ColorPaletteColor;
  italic?: boolean;
  bold?: boolean;
}

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
  color = 'text',
  italic = false,
  bold = false,
  children,
  ...props
}) => (
  <TextBase color={color} italic={italic} bold={bold} {...props}>
    {children}
  </TextBase>
);
