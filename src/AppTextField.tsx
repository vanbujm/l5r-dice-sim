import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';
// MuiFormLabel-root MuiFormLabel-colorSecondary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled
const WhiteLabelTextField = styled(TextField)<any>`
  .MuiInputLabel-shrink {
    font-size: 1.25rem;
    min-width: 200px;
  }
  .Mui-focused {
    color: ${({ theme }) => theme.secondary};
  }
`;

export const AppTextField = ({ ...props }) => {
  return <WhiteLabelTextField {...props} color="secondary" />;
};
