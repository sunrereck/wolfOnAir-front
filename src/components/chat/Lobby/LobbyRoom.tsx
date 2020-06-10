import React, { useState } from "react";
import styled from "styled-components";

import Textarea from '@/components/ui/Textarea';

const LobbyRoom = () => {
  const [test, setTest] = useState("");

  return (
    <LobbyRoomWrapper>
      <Room />
      <div>
        <Textarea width="100%" value={test} onChange={(e: any) => {setTest(e.target.value)}} />
      </div>
    </LobbyRoomWrapper>
  );
};

const LobbyRoomWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 700px;
`;

const Room = styled.div`
  width: 100%;
  border: 1px solid #000000;
  min-height: 150px;

  div {
    margin-top: 0.5rem;
    padding: 1rem;
  }
`;

export default LobbyRoom;
