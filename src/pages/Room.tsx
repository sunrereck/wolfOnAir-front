import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';

interface RoomProps extends RouteComponentProps {
  isCheckingAuth: boolean;
}

const Lobby = ({
  isCheckingAuth,
  history
}: RoomProps): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome isCheckingAuth={isCheckingAuth}/>
      룸!
    </PageTemplate>
  );
};

export default Lobby;