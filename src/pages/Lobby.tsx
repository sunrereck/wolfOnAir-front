import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';
import LobbyContainer from '@/containers/chat/LobbyContainer';

interface ILobbyProps {
  isCheckingAuth: boolean;
  socket: any
}

const Lobby = ({
  isCheckingAuth,
  socket
}: ILobbyProps): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome isCheckingAuth={isCheckingAuth}/>
      <LobbyContainer socket={socket} />
    </PageTemplate>
  );
};

export default Lobby;