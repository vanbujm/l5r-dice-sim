import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex: 1;

  background-image: url('brush-stroke-banner-1-onlygfx-dot-com.svg');
  background-repeat: no-repeat, repeat;
  background-position-y: 80%;
  background-position-x: center;

  color: ${props => props.theme.color.light};

  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.sizes.h1};

  padding: ${props => props.theme.grid.spaceM}
    ${props => props.theme.grid.spaceM}
    max(${props => props.theme.grid.spaceM}, 2rem)
    max(${props => props.theme.grid.spaceM}, 3rem);
`;

export const TopBar: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Nav>{children}</Nav>
);
