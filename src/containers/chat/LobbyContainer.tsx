import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Chat } from '@/interface/chat';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';
import { join, sendMessage } from '@/modules/chat';

import useInput from '@/hooks/useInput';
import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isShownConfirm, setConfirm] = useState(false);
  const [chatLiset, setChatList] = useState<Chat[]>([]);
  const {isLoggedIn, chat, uid } = useSelector((state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid,
    chat: state.chat.chat 
  }));
  const [message, onChangeMessage, onResetMessage] = useInput();
  const [roomTitle, onChangeRoomTitle, onResetRoomTitle] = useInput();
  const [state, onConnectLobby, onReset] = useRequest(() => connectLobby(uid), [], true);

  const onOpenNewRoom = () => {
    setConfirm(true);
  }

  const onCloseNewRoom = () => {
    onResetRoomTitle();
    setConfirm(false);
  }

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

  }, [state]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    setChatList((prevState) => prevState.concat(chat));
  }, [chat])

  return (
    <>
      <Lobby 
        chatList={chatLiset}
        isError={!!state.error}
        isShownNewRoom={isShownConfirm}
        message={message}
        roomList={[]}
        roomTitle={roomTitle}
        onChangeMessage={onChangeMessage}
        onChangeRoomTitle={onChangeRoomTitle}
        onCloseNewRoom={onCloseNewRoom}
        onOpenNewRoom={onOpenNewRoom}
        onResetError={onReset}
        onSendMessage={onSendMessage}
      />
    </>
  );
};

export default LobbyContainer;