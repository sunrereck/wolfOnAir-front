import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';
import LobbyContainer from '@/containers/chat/LobbyContainer';

interface LobbyProps {
  isAuthLoading: boolean;
}

const Lobby = ({
  isAuthLoading
}: LobbyProps): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome isAuthLoading={isAuthLoading}/>
      <LobbyContainer />
    </PageTemplate>
  );
};

export default Lobby;