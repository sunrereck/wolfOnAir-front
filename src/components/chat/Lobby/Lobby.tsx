import React from "react";
import styled from "styled-components";

import { Room } from '@/types';

import ChatList from './ChatList';
import EmptyChat from './EmptyChat';

const Lobby = ({ chatList }) => {
  return (
    <LobbyWrapper>
      {chatList.length > 0 ? <ChatList /> : <EmptyChat />}
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
