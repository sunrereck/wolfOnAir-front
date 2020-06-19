import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connectLobby } from '@/api/chat';

import { RootState } from '@/modules';
import { joinLobby } from '@/modules/chat';

import useRequest from '@/hooks/useRequest';

import Lobby from '@/components/chat/Lobby';

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
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
    if (state && state.data) {
      dispatch(joinLobby.request(true));
    }

  }, [state]);

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