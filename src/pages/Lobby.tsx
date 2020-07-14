import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';
import LobbyContainer from '@/containers/chat/LobbyContainer';

interface LobbyProps extends RouteComponentProps {
  isCheckingAuth: boolean;
}

const Lobby = ({
  isCheckingAuth
}: LobbyProps): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome isCheckingAuth={isCheckingAuth}/>
      <LobbyContainer />
    </PageTemplate>
  );
};

export default Lobby;