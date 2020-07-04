import React from "react";
import styled from "styled-components";

import { Chat } from '@/interface/chat';

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import LobbyChat from "./LobbyChat";
import NewRoomModal from './NewRoomModal';

interface LobbyProps {
  chatList: Chat[];
  isError: boolean;
  isShownNewRoom: boolean;
  message: string;
  roomList: any[];
  roomTitle: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRoomTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseNewRoom: () => void;
  onOpenNewRoom: () => void;
  onResetError: () => void;
  onSendMessage: () => void;
}

const Lobby = ({
  chatList,
  isError,
  isShownNewRoom,
  message,
  roomList,
  roomTitle,
  onChangeMessage,
  onChangeRoomTitle,
  onCloseNewRoom,
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
        <LobbyChat
          chatList={chatList}
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
        onClick={() => {}}
        onClose={onCloseNewRoom}
        onOpen={onOpenNewRoom}
      />
      <Alert
        isShown={isError}
        onClick={onResetError}
        onClose={onResetError}
        title="로비 접속 실패"
      >
        로비에 접속할 수 없습니다.
        <br />
        잠시 후 다시 시도해주세요.
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

  button {
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

export default Lobby;
