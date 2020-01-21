import styled from 'styled-components';

export const SecreteParent = styled.div`
  display: inline-block;
  margin: ${({ theme: { grid } }) => `${grid.spaceS}`};
  position: relative;
`;
