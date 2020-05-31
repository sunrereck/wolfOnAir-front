import React from 'react';

import { connectChat } from '@/api/chat';

import useRequest from '@/hooks/useRequest';

const LobbyContainer = (): JSX.Element => {
  const [state] = useRequest(connectChat, [], false);

  return (
    <div>로비</div>
  );
};

export default LobbyContainer;