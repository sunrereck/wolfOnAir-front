import React, { useState } from "react";
import styled from "styled-components";

import Textarea from "@/components/ui/Textarea";

const LobbyRoom = ({ chatList }: {chatList: string[]}) => {
  const [test, setTest] = useState("");

  return (
    <LobbyRoomWrapper>
      <Lobby>
        {chatList.map((chat) => (
          <span>{chat}</span>
        ))}
      </Lobby>
      <LobbyRoomInput>
        <Textarea
          width="100%"
          value={test}
          onChange={(e: any) => {
            setTest(e.target.value);
          }}
        />
        <button type="button">채팅</button>
      </LobbyRoomInput>
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

const Lobby = styled.div`
  width: 100%;
  border: 1px solid #000000;
  min-height: 150px;
`;

const LobbyRoomInput = styled.div`
  position: relative;
  margin-top: 0.5rem;
  padding-top: 0.5rem; 
  padding-right: 4.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  border: 1px solid #000000;
  border-radius: 2px;

  button {
    position: absolute;
    width: 50px;
    height: 28px;
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

export default LobbyRoom;
