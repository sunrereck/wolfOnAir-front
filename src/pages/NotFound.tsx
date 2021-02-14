import React from 'react';

import styled from "styled-components";

import Button from '@/components/atoms/Button';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Error = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-align: center;
`;


const NotFound = () => {
  return (
    <Wrapper>
      <Error>
        앗, 없는 페이지 입니다. X_X
        <br/>
        <br/>
        <Button 
          to="/" 
          color="primary" 
          variant="outlined"
          width="13.125rem"
          height="3rem">첫 페이지로 돌아가기</Button>
      </Error>
    </Wrapper>
  )
}

export default NotFound;
