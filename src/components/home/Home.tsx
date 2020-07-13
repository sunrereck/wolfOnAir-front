import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

interface HomeProps {
  onRedirectLobby: () => void;
}

const Home = ({
  onRedirectLobby
}: HomeProps) => (
  <Wrapper>
    <div>
      <img src="/wolf.svg" alt="늑대온에어 메인" />
      <Button type="button" onClick={onRedirectLobby}>게임 하러 가기</Button>
    </div>
  </Wrapper>
);

const Wrapper = styled.main`
  div {
    text-align: center;
    padding: 1.5rem 0;
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