import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';
import { joinLobby } from '@/modules/chat';

import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const [chatLiset, setChatList] = useState<{user: string; message: string}[]>([]);
  const dispatch = useDispatch();
  const {isLoggedIn, chat, uid } = useSelector((state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid,
    //@ts-ignore
    chat: state.chat.chat 
  }));
  const [state, onConnectLobby, onReset] = useRequest(() => connectLobby(uid), [], true);

  useEffect(() => {
    if (isLoggedIn) {
      onConnectLobby();
    }

  // eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    if (state && state.data) {
      dispatch(joinLobby());
    }

  }, [state]);

  useEffect(() => {
    if (!chat || !chat.user) {
      return;
    }

    setChatList((prevState) => prevState.concat(chat));
  }, [chat])

  return (
    <>
      <Lobby 
        chatList={chatLiset}
        isError={!!state.error}
        onResetError={onReset}
      />
    </>
  );
};

export default LobbyContainer;