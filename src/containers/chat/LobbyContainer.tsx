import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';

import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const {isLoggedIn, uid } = useSelector((state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid
  }));
  const [, onConnectLobby] = useRequest(() => connectLobby(uid), [], true);

  useEffect(() => {
    if (isLoggedIn) {
      onConnectLobby();
    }

  }, [isLoggedIn]);

  return (
    <Lobby />
  );
};

export default LobbyContainer;