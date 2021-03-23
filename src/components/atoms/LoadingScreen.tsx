import React from 'react';
import styled from 'styled-components';

function LoadingScreen (): React.ReactElement {
  return (
    <LoadingBar>
        <div/>
        <div/>
        <div/>
    </LoadingBar>
  )
}


const LoadingBar = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;

  div {
    width: 1rem;
    height: 1rem;
    margin: 2rem .3rem;
    background-color: ${({theme}) => theme.primaryColor};
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


export default LoadingScreen;