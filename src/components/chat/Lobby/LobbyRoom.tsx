import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Chat } from "@/interface/chat";

import Textarea from "@/components/ui/Textarea";
import Message from "../Message";

interface LobbyRoomProps {
  chatList: any[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

const LobbyRoom = ({
  chatList,
  value,
  onChange,
  onSendMessage,
}: LobbyRoomProps): JSX.Element => {
  const lobbyRef = useRef<HTMLDivElement>(null); 

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    onSendMessage();
  };

  useEffect(() => {
    if (!lobbyRef || !lobbyRef.current) {
      return;
    }

    const { scrollHeight, clientHeight } = lobbyRef.current;
    
    if (clientHeight < scrollHeight) {
      lobbyRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [chatList.length]);

  return (
    <LobbyRoomWrapper>
      <Lobby ref={lobbyRef}>
        {chatList.map((chat: Chat) => (
          <Message
            isSystem={chat.userName === "system"}
            message={chat.message}
            userName={chat.userName}
          />
        ))}
      </Lobby>
      <LobbyRoomInput>
        <Textarea
          width="100%"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button type="button" onClick={onSendMessage}>
          채팅
        </button>
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
  overflow-y: scroll;
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border: 1px solid #000000;
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
