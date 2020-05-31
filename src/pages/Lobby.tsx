import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';
import LobbyContainer from '@/containers/chat/LobbyContainer';

const Lobby = (): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome />
      <LobbyContainer />
    </PageTemplate>
  );
};

export default Lobby;