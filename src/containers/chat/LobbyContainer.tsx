import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";

import { Chat } from "@/interface/chat";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";
import { join, leave, sendMessage } from "@/modules/chat";

import useInput from "@/hooks/useInput";
import useRequest from "@/hooks/useRequest";

import Lobby from "@/components/chat/Lobby";

interface LobbyContainerProps {
  history: History
}

const LobbyContainer = ({ history }: LobbyContainerProps): JSX.Element => {
  const dispatch = useDispatch();
  const [isShownConfirm, setConfirm] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { isLoggedIn, chat, uid, userName } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.user.isLoggedIn,
      uid: state.user.uid,
      userName: state.user.userName,
      chat: state.chat.chat,
    })
  );
  const [message, onChangeMessage, onResetMessage] = useInput();
  const [roomTitle, onChangeRoomTitle, onResetRoomTitle] = useInput();
  const [state, onConnectLobby, onReset] = useRequest(
    () => connectLobby(uid),
    [],
    true
  );
  const [state2, onCreateRoom] = useRequest(createRoom, [], true);

  const onOpenNewRoom = () => {
    setConfirm(true);
  };

  const onCloseNewRoom = () => {
    onResetRoomTitle();
    setConfirm(false);
  };

  const onClickNewRoom = async () => {
    try {
      await onCreateRoom(roomTitle, userName);
    } catch (err) {
      //
    }
  };

  const onSendMessage = useCallback(() => {
    if (!message) {
      return;
    }

    dispatch(sendMessage(message));
    onResetMessage();
  }, [dispatch, message, onResetMessage]);

  useEffect(() => {
    if (isLoggedIn) {
      onConnectLobby();
    }

    // eslint-disable-next-line
  }, [isLoggedIn]);

  
  useEffect(() => {

    if (state && state.data) {
      dispatch(join());
    }

    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    setChatList((prevState) => prevState.concat(chat));
  }, [chat]);

  useEffect(() => {
    if (state2 && state2.data) {
      dispatch(leave());
      history.push(`/room/${state2.data.roomId}`);
    }
  }, [state2]);

  return (
    <>
      <Lobby
        chatList={chatList}
        isError={!!state.error}
        isShownNewRoom={isShownConfirm}
        message={message}
        roomList={[]}
        roomTitle={roomTitle}
        onChangeMessage={onChangeMessage}
        onChangeRoomTitle={onChangeRoomTitle}
        onCloseNewRoom={onCloseNewRoom}
        onCreateRoom={onClickNewRoom}
        onOpenNewRoom={onOpenNewRoom}
        onResetError={onReset}
        onSendMessage={onSendMessage}
      />
    </>
  );
};

export default LobbyContainer;
