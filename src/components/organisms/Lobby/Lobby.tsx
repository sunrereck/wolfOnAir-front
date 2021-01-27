import React from 'react';
import styled from 'styled-components';

import { Chat } from "@/interface/chat";

import mediaQuerys from '@/styles/mediaQuerys';

import RoomList from "@/components/organisms/RoomList";
import ChatMessages from '@/components/molecules/ChatMessages';
import ChatInput from '@/components/molecules/ChatInput';

interface LobbyProps {
  chats: Chat[];
  onSendMessage: (message: string) => void;
}

function Lobby({
  chats,
  onSendMessage
}: LobbyProps): React.ReactElement {
  return (
    <Wrapper>
      <RoomList rooms={[]} />
      <ChatMessages chats={chats} />
      <ChatInput onSendMessage={onSendMessage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(${(window.innerHeight)}px - 3.125rem);
  margin: 0 auto;
  padding: 0 1rem;
  flex-direction: column;

  @media ${mediaQuerys.tablet} { 
    width: 46.875rem;
  }
`;

export default Lobby;