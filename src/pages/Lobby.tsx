import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import LobbyContainer from '@/containers/LobbyContainer';

function Lobby (): React.ReactElement {
  return (
    <PageTemplate>
      <LobbyContainer />
    </PageTemplate>
  );
};

export default Lobby;