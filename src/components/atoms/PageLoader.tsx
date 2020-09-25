import React from 'react';
import styled from 'styled-components';

const LoadingBar = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.whiteColor};
  align-items: center;
  justify-content: center;
  top: 0; 
  left: 0;


  div {
    width: 0.5rem;
    height: 0.5rem;
    margin: 2rem .3rem;
    background-color: ${({theme}) => theme.borderColor};
    border-radius: 50%;
    animation: 0.6s bounce infinite alternate;

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }

  @keyframes bounce {
    to {
      opacity: 0.3;
      transform: translate3d(0, -1rem, 0);
    }
  }
`;

const PageLoader = () => {
  return (
    <LoadingBar>
      <div/>
      <div/>
      <div/>
    </LoadingBar>
  )
}

export default PageLoader;
