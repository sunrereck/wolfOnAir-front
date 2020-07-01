import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Chat } from '@/interface/chat';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';
import { join, sendMessage } from '@/modules/chat';

import useInput from '@/hooks/useInput';
import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const [chatLiset, setChatList] = useState<Chat[]>([]);
  const dispatch = useDispatch();
  const {isLoggedIn, chat, uid } = useSelector((state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid,
    //@ts-ignore
    chat: state.chat.chat 
  }));
  const [value, onChange, onResetInput] = useInput();
  const [state, onConnectLobby, onReset] = useRequest(() => connectLobby(uid), [], true);

  const onSendMessage = () => {
    if (!value) {
      return;
    }

    dispatch(sendMessage(value));
    onResetInput();
  };

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
        roomList={[]}
        value={value}
        onChange={onChange}
        onResetError={onReset}
        onSendMessage={onSendMessage}
      />
    </>
  );
};

export default LobbyContainer;