import React from 'react'
import styled from 'styled-components';

import Input from '../Input';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  input { 
    width: 100%;
  }
`;

const ErrorText = styled.span`
  display: inline-block;
  width: 100%;
`;

const ValidationInput = () => {
  return (
    <Wrapper>
      <Input />
      <ErrorText />
    </Wrapper>
  )
}

export default ValidationInput;
