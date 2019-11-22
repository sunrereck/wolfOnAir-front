import React from 'react';
import { Link } from "react-router-dom";

import styled from "styled-components";

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

const HomeButton = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid ${({theme}) => theme.primaryColor};
  border-radius: 5px;
  color: ${({theme}) => theme.primaryColor};
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Error>
        앗, 없는 페이지 입니다. X_X
        <br/>
        <HomeButton to="/">첫 페이지로 돌아가기</HomeButton>
      </Error>
    </Wrapper>
  )
}

export default NotFound;
