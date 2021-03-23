import React from 'react';
import styled from 'styled-components';

import { Chat } from "@/models/chat";
import { RoomModeTypes } from "@/models/room";

import mediaQuerys from '@/styles/mediaQuerys';

import NewRoomModal from '@/components/molecules/NewRoomModal';
import ChatMessages from '@/components/molecules/ChatMessages';
import ChatInput from '@/components/molecules/ChatInput';
import RoomList from "@/components/organisms/RoomList";

interface LobbyProps {
  chats: Chat[];
  isSowingNewRoomModal: boolean;
  peopleCount: number;
  roomMode: RoomModeTypes;
  onSendMessage: (message: string) => void;
  onSetRoomType: (roomType: string) => void;
  onSetPeopleCount: (peopleCount: number) => void;
}

function Lobby({
  chats,
  isSowingNewRoomModal,
  peopleCount,
  roomMode,
  onSendMessage
}: LobbyProps): React.ReactElement {
  return (
    <>
      <Wrapper>
        <RoomList rooms={[]} />
        <ChatMessages chats={chats} />
        <ChatInput onSendMessage={onSendMessage} />
      </Wrapper>
      <NewRoomModal 
        isShowing={isSowingNewRoomModal}
        peopleCount={peopleCount} 
        roomMode={roomMode} />
    </>
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