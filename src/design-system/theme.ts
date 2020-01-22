import { Breakpoints, ColorPalette, Grid, Sizes, Theme } from './theme-types';

export const color: ColorPalette = {
  primary: '#c83834',
  secondary: '#5b6953',
  light: '#f2efea',
  dark: '#3a3933',
  text: '#1a1919',
  important: '#854a48',
  info: '#546b7e',
  success: '#5e785d',
  error: '#7c6448',
  flair: '#766a73'
};

const grid: Grid = {
  spaceXs: '0.25rem',
  spaceS: '0.5rem',
  spaceM: '1rem',
  spaceL: '2rem',
  spaceXl: '4rem'
};

const breakpoints: Breakpoints = {
  xl: '1690px',
  l: '1280px',
  m: '980px',
  s: '736px',
  xs: '480px',
  xxs: '320px'
};

const sizes: Sizes = {
  h1: '3.8125rem',
  h2: '3.0625rem',
  h3: '2.4375rem',
  h4: '1.9375rem',
  h5: '1.5625rem',
  h6: '1.25rem',
  p: '1rem',

  mobileH1: '6.103515625em',
  mobileH2: '4.8828125em',
  mobileH3: '3.90625em',
  mobileH4: '3.125em',
  mobileH5: '2.5em',
  mobileH6: '2em',
  mobileP: '1.6em'
};

const fonts = {
  text: 'Alegreya, serif',
  heading: 'Edo, serif'
};

export const theme: Theme = { color, grid, sizes, breakpoints, fonts };
