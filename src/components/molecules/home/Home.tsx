import React from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';

interface HomeProps {
  onRedirectLobby: () => void;
}

function Home ({
  onRedirectLobby
}: HomeProps): React.ReactElement {
  return (
    <Wrapper>
      <div>
        <p>
          <img src="/wolf.svg" alt="늑대온에어 메인" />
        </p>
        <Button 
          type="button" 
          color="primary" 
          width="8.125rem"
          height="3rem"
          onClick={onRedirectLobby}>게임 하러 가기</Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  div {
    text-align: center;
  }
  p {
    text-align: center;
  }

  img {
    width: 100px;
    height: 191px;
  }

  button {
    margin: 1.25rem auto 0;
  }
`;

export default Home;