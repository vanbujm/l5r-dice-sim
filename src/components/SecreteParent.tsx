import styled from 'styled-components';

export const SecreteParent = styled.div`
  display: inline-block;
  margin: ${({ theme: { grid } }) => ` 0 0 0 ${grid.spaceS}`};
  position: relative;
`;
