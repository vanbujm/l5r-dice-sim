import styled, { css } from 'styled-components';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { ColorPaletteColor, Sizes } from '../design-system/theme-types';

type headers = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends HTMLAttributes<any> {
  type?: keyof Sizes;
  component?: headers;
  color?: ColorPaletteColor;
}
// const Component = (subProps: any) =>
//     React.createElement(component, subProps, children);
// const StyledComponent = styled(Component)`
//     font-family: 'Edo', serif;
//     font-size: ${props => props.theme.sizes[props.type]};
//     color: ${props => props.theme.color[props.color]};
//   `;

// // @ts-ignore
// const StyledComponent = styled[component]`
//     font-family: 'Edo', serif;
//     font-size: ${props => props.theme.sizes[props.type]};
//     color: ${props => props.theme.color[props.color]};
//   `;

interface StyleProps {
  type: keyof Sizes;
  color: ColorPaletteColor;
}

const headingStyle = css<StyleProps>`
  font-family: 'Edo', serif;
  font-size: ${props => props.theme.sizes[props.type]};
  color: ${props => props.theme.color[props.color]};
`;

const StyledH1 = styled.h1<StyleProps>`
  ${headingStyle}
`;

const StyledH2 = styled.h2<StyleProps>`
  ${headingStyle}
`;

const StyledH3 = styled.h3<StyleProps>`
  ${headingStyle}
`;

const StyledH4 = styled.h4<StyleProps>`
  ${headingStyle}
`;

const StyledH5 = styled.h5<StyleProps>`
  ${headingStyle}
`;

const StyledH6 = styled.h6<StyleProps>`
  ${headingStyle}
`;

const styledHeadersMap: any = {
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  h4: StyledH4,
  h5: StyledH5,
  h6: StyledH6
};

const headerList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  type = 'h1',
  component = headerList.includes(type) ? type : 'h1',
  color = 'secondary',
  children,
  ...props
}) => {
  const Component = styledHeadersMap[component];
  return <Component color={color} type={type} {...props} >{children}</Component>;
};
