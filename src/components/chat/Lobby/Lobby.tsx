import React from "react";
import styled from "styled-components";

import { Room } from '@/interface/chat/room';

import ChatList from './ChatList';
import EmptyChat from './EmptyChat';
import LobbyRoom from './LobbyRoom';

const Lobby = ({ chatList }: {
  chatList: Room[]
}): JSX.Element => {
  return (
    <LobbyWrapper>
      {chatList.length > 0 ? <ChatList /> : <EmptyChat />}
      <LobbyRoom />
    </LobbyWrapper>
  );
};

const LobbyWrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 864px;
`;

export default Lobby;
