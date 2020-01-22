import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { darken, desaturate, lighten } from 'polished';
import { ColorPaletteColor } from '../design-system/theme-types';

interface TabLabelProps {
  color: ColorPaletteColor;
  isCard: boolean;
}

const TabContainer = styled.div`
  font-family: ${props => props.theme.fonts.text};
  font-size: ${props => props.theme.sizes.h6};
  font-weight: bold;
  margin: 0 ${props => props.theme.grid.spaceS};
`;

const Tab = styled.div`
  width: 100%;
  position: relative;
`;

const TabLabel = styled.label<TabLabelProps>`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  
  ${props =>
    props.isCard
      ? `background-color: ${lighten(0.5, props.theme.color[props.color])};
  box-shadow: inset 0 10px 10px -10px
    ${lighten(0.3, desaturate(0.05, props.theme.color[props.color]))};
    `
      : `
      background: linear-gradient(
    145deg,
    ${lighten(0.1, props.theme.color.light)},
    ${darken(0.1, props.theme.color.light)}
  );
      `}
  color: ${props => darken(0.1, props.theme.color[props.color])};


  border: ${props =>
    `2px solid ${darken(0.1, props.theme.color[props.color])}`};

  &::before {
    content: ' ';
    position: absolute;
    background-color: transparent;
    width: calc(100% + 4px);
    height: calc(100% + 6px);
    top: -4px;
    left: -2px;
    border-bottom: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
    border-top: ${props =>
      `1px solid ${darken(0.1, props.theme.color[props.color])}`};
  }

  &::after {
    content: '\\276F';
    width: 1em;
    height: 1em;
    text-align: center;
    transition: all 0.35s;
  }
`;

const TabContent = styled.div`
  max-height: 0;
  padding: 0 1em;
  transition: all 0.125s;
  border: 0px solid black;

  overflow: hidden;
`;

const SecreteCheckBox = styled.input<TabLabelProps>`
  position: absolute;
  opacity: 0;
  z-index: -1;
  
  &:focus {
    & + ${TabLabel} {
      outline: ${props => props.theme.color[props.color]} auto 5px;
    }
  }

  &:checked {
    & + ${TabLabel} {
      border-bottom: ${props =>
        `1px solid ${darken(0.1, props.theme.color[props.color])}`};
      &::after {
        transform: rotate(86deg);
      }
      &::before {
        border-bottom: none;
      }
    }
    & ~ ${TabContent} {
      max-height: 100vh;
      padding: 1em;
      border: ${props =>
        `2px solid ${darken(0.1, props.theme.color[props.color])}`};
      border-top: 0px solid black;
      position: relative;
      overflow: unset;
      
      //box-shadow:        inset  0 -10px 10px -10px grey;
      
      ${props =>
        props.isCard
          ? `background-color: ${lighten(0.5, props.theme.color[props.color])};
  box-shadow: inset 0 -10px 10px
   -10px
    ${lighten(0.3, desaturate(0.05, props.theme.color[props.color]))};
    `
          : ''}
      
      
      &::before {
        content: ' ';
        position: absolute;
        background-color: transparent;
        width: calc(100% + 4px);
        height: calc(100% + 6px);
        top: -3px;
        left: -2px;
        z-index: -1;
        border-bottom: ${props =>
          `1px solid ${darken(0.1, props.theme.color[props.color])}`};
    }
  }
`;

interface AccordionProps {}

interface AccordionItemProps {
  id?: string;
  label: string;
  color?: ColorPaletteColor;
  card?: boolean;
}

export const AccordionItem: React.FC<PropsWithChildren<AccordionItemProps>> = ({
  card = false,
  label,
  id = label,
  color = 'success',
  children
}) => (
  <Tab>
    <SecreteCheckBox color={color} type="checkbox" id={id} isCard={card} />
    <TabLabel color={color} htmlFor={id} isCard={card}>
      {label}
    </TabLabel>
    <TabContent>{children}</TabContent>
  </Tab>
);

export const Accordion: React.FC<PropsWithChildren<AccordionProps>> = ({
  children
}) => <TabContainer>{children}</TabContainer>;
