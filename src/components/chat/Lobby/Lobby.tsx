import React from "react";
import styled from "styled-components";

import { Chat } from '@/interface/chat';

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import ChatInput from '@/components/chat/ChatInput';
import ChatList from '@/components/chat/ChatList';
import NewRoomModal from './NewRoomModal';

interface LobbyProps {
  chatList: Chat[];
  errorMessage: string;
  isError: boolean;
  isShownNewRoom: boolean;
  message: string;
  roomList: any[];
  roomTitle: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRoomTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseNewRoom: () => void;
  onCreateRoom: () => void;
  onOpenNewRoom: () => void;
  onResetError: () => void;
  onSendMessage: () => void;
}

const Lobby = ({
  chatList,
  errorMessage,
  isError,
  isShownNewRoom,
  message,
  roomList,
  roomTitle,
  onChangeMessage,
  onChangeRoomTitle,
  onCloseNewRoom,
  onCreateRoom,
  onOpenNewRoom,
  onSendMessage,
  onResetError
}: LobbyProps): JSX.Element => {
  return (
    <>
      <LobbyWrapper>
        <Button
          type="button"
          color="primary"
          size="small"
          onClick={onOpenNewRoom}
        >
          방 만들기
        </Button>
        <ChatList
          chatList={chatList}
        />
        <ChatInput 
          message={message}
          onChangeMessage={onChangeMessage}
          onSendMessage={onSendMessage}        
        />
      </LobbyWrapper>
      <NewRoomModal 
        isShown={isShownNewRoom}
        roomTitle={roomTitle}
        onCancel={onCloseNewRoom}
        onChangeRoomTitle={onChangeRoomTitle}
        onClick={onCreateRoom}
        onClose={onCloseNewRoom}
        onOpen={onOpenNewRoom}
      />
      <Alert
        isShown={isError}
        onClick={onResetError}
        onClose={onResetError}
        title="오류 발생"
      >
        {errorMessage}
      </Alert>
    </>
  );
};

const LobbyWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
  flex-direction: column;

  > button {
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

export default Lobby;
