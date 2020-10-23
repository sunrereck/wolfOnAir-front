import React from 'react';

import styled from 'styled-components';

interface ILabelProps {
  isRequired: boolean;
  label: string;
}

function Label({
  isRequired,
  label
}: ILabelProps) {
  return (
    <Wrapper>
      {label}
      {isRequired && <span>*</span>}
    </Wrapper>
  ) 
}

const Wrapper = styled.label`
  font-size: 0.875rem;

  span {
    margin-left: 0.25rem;
    font-size: 0.75rem;
    color: ${({theme}) => theme.redColor};
  }
`;

export default Label;