import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/atoms/RedirectHome';
import LobbyContainer from '@/containers/LobbyContainer';

const Lobby = (): React.ReactElement => {
  return (
    <PageTemplate>
      <RedirectHome />
      <LobbyContainer />
    </PageTemplate>
  );
};

export default Lobby;