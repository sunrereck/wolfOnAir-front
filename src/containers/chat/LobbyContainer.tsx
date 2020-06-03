import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { connectChat } from '@/api/chat';

import { RootState } from '@/modules';

import useRequest from '@/hooks/useRequest';

const LobbyContainer = (): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [] = useRequest(connectChat, [], true);

  useEffect(() => {
    if (isLoggedIn) {
      connectChat();
    }
  }, [isLoggedIn]);

  return (
    <div>로비</div>
  );
};

export default LobbyContainer;