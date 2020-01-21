import { addDecorator } from '@storybook/react';
import {theme} from "../src/design-system/theme";
import {ThemeProvider} from "styled-components";
import React from "react";
import { withA11y } from '@storybook/addon-a11y';
import {Reset} from "../src/design-system/Reset";
import {GlobalStyles} from "../src/design-system/GlobalStyle";

addDecorator(withA11y);
addDecorator(storyFn => <><Reset/><GlobalStyles /><ThemeProvider theme={theme}>{storyFn()}</ThemeProvider></>);