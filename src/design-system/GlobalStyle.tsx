import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Alegreya";
    src: url("fonts/Alegreya-Bold.otf");
    font-weight: bold;
}

@font-face {
    font-family: "Alegreya";
    src: url("fonts/Alegreya-BoldItalic.otf");
    font-weight: bold;
    font-style: italic, oblique;
}

@font-face {
    font-family: "Alegreya";
    src: url("fonts/Alegreya-Italic.otf");
    font-style: italic, oblique;
}

@font-face {
    font-family: "Alegreya";
    src: url("fonts/Alegreya-Regular.otf");
}

@font-face {
    font-family: "Edo";
    src: url("fonts/edo-webfont.woff");
}

@font-face {
    font-family: "Edo";
    src: url("fonts/edo-webfont.woff");
}
@font-face {
    font-family: "L5R-Icons";
    src: url("fonts/L5R-Icons.ttf");
}

html, body {
  font-family: ${theme.fonts.text};
  font-size: 16px;
  color: ${theme.color.text};
  background-color: ${theme.color.light};
}

h1 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h1};
  line-height: 6rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

h2 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h2};
  line-height: 6rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

h3 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h3};
  line-height: 3rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

h4 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h4};
  line-height: 3rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

h5 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h5};
  line-height: 3rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

h6 {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.sizes.h6};
  line-height: 3rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0em;
}

p {
  margin-bottom: 2rem;
  font-family: ${theme.fonts.text};
  font-size: ${theme.sizes.p};
  line-height: 2rem;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0em;
}

input {
  padding: 0 ${theme.grid.spaceS};
  font-family: ${theme.fonts.text};
  font-size: ${theme.sizes.p};
  line-height: 2rem;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0em;
}

@media screen and (max-width: ${theme.breakpoints.s}) {
  h1 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH1};
    line-height: 9rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  h2 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH2};
    line-height: 6rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  h3 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH3};
    line-height: 6rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  h4 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH4};
    line-height: 6rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  h5 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH5};
    line-height: 3rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  h6 {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.mobileH6};
    line-height: 3rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0em;
  }

  p {
    margin-bottom: 2rem;
    font-family: ${theme.fonts.text};
    font-size: ${theme.sizes.mobileP};
    line-height: 2rem;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0em;
  }
}
`;
