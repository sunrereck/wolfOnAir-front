import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';

import useRequest from '@/hooks/useRequest';

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
    <div>로비</div>
  );
};

export default LobbyContainer;