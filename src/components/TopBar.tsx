import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: inline-block;
  min-width: 100vw;
  box-sizing: border-box;
  flex: 1;

  background-image: url('brush-stroke-banner-1-onlygfx-dot-com.svg');
  background-repeat: no-repeat, repeat;
  background-position-y: 80%;
  background-position-x: center;
  background-size: 120%;

  padding: ${props => props.theme.grid.spaceM}
    ${props => props.theme.grid.spaceM}
    max(${props => props.theme.grid.spaceM}, 2rem)
    max(${props => props.theme.grid.spaceM}, 3rem);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.l}) {
    background-size: 120%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.m}) {
    background-size: 140%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.s}) {
    background-size: 190%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    background-size: 350%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.xxs}) {
    background-size: 400%;
  }
`;

export const TopBar: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Nav>{children}</Nav>
);
