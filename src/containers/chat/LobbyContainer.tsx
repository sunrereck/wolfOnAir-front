import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';

import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = ({
  socket
}: any): JSX.Element => {
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
    console.log(state.data);
   if (state.data === 'OK') {
      socket.emit('join')
    }

  }, [state]);

  socket.on('joinLobby', (data: any) => {
    console.log(data);
  });

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