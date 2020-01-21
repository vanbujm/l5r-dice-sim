export interface ColorPalette {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
  text: string;
  important: string;
  info: string;
  success: string;
  error: string;
  flair: string;
}

export type ColorPaletteColor = keyof ColorPalette;

export interface Grid {
  spaceXs: string;
  spaceS: string;
  spaceM: string;
  spaceL: string;
  spaceXl: string;
}

export interface Breakpoints {
  xl: string;
  l: string;
  m: string;
  s: string;
  xs: string;
}

export interface Sizes {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  p: string;
  mobileH1: string;
  mobileH2: string;
  mobileH3: string;
  mobileH4: string;
  mobileH5: string;
  mobileH6: string;
  mobileP: string;
}

export interface Fonts {
  text: string;
  heading: string;
}

export interface Theme {
  color: ColorPalette;
  grid: Grid;
  sizes: Sizes;
  fonts: Fonts;
  breakpoints: Breakpoints;
}
