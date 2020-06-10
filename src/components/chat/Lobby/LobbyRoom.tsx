import React, { useState } from "react";
import styled from "styled-components";

const LobbyRoom = () => {
  const [test, setTest] = useState("");

  return (
    <LobbyRoomWrapper>
      <Room />
      <div>
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
`;

export default LobbyRoom;
