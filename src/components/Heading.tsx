import styled from 'styled-components';
import React, { HTMLAttributes, PropsWithChildren, ReactHTML } from 'react';
import { ColorPaletteColor, Sizes } from '../design-system/theme-types';

interface HeadingProps extends HTMLAttributes<any> {
  type?: keyof ReactHTML;
  component?: keyof Sizes;
  color?: ColorPaletteColor;
}

export const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  type = 'h1',
  component = type,
  color = 'secondary',
  children,
  ...props
}) => {
  const Component = (subProps: any) =>
    React.createElement(type, subProps, children);
  const StyledComponent = styled(Component)`
    font-family: 'Edo', serif;
    color: ${props => props.theme.color[props.color]};
  `;
  return <StyledComponent color={color} {...props} />;
};
