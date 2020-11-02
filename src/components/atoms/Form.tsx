import React from 'react';

import styled from "styled-components";

import mediaQuerys from '@/styles/mediaQuerys';

function Form (props: React.FormHTMLAttributes<HTMLFormElement>): React.ReactElement {
  return <Wrapper {...props} />
}

const Wrapper = styled.form`
  width: 100%;
  max-width: 28.75rem;

  @media ${mediaQuerys.tablet} { 
    width: 28.75rem;
  }
`;

export default Form;
