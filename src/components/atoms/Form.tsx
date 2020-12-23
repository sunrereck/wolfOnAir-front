import React from 'react';

import styled from "styled-components";

import mediaQuerys from '@/styles/mediaQuerys';

function Form (props: React.FormHTMLAttributes<HTMLFormElement>): React.ReactElement {
  return <Wrapper {...props} />
}

const Wrapper = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 28rem;

  @media ${mediaQuerys.tablet} { 
    width: 28rem;
  }
`;

export default Form;
