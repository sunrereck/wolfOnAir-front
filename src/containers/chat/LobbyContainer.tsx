import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'socket.io-client';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';

import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const socket = useRef(connect('http://localhost:4000/chat', { path: '/socket.io'}));
  const {isLoggedIn, uid } = useSelector((state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid
  }));
  const [state, onConnectLobby, onReset] = useRequest(() => connectLobby(uid), [], true);

  useEffect(() => {
    if (isLoggedIn) {
      onConnectLobby();
    }

  // eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    if (!!state.error) {
      return;
    }

    socket.current.on('join', (data: any) => {
      console.log(data);
    });
  
  }, [state.error]);

  return (
    <>
      <Lobby 
        chatList={[]}
        isError={!!state.error}
        onResetError={onReset}
      />
    </>
  );
};

export default LobbyContainer;