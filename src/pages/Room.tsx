import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/layout/RedirectHome';
import Room from '@/components/room/Room';

interface RoomProps extends RouteComponentProps {
  isCheckingAuth: boolean;
}

const Lobby = ({
  isCheckingAuth
}: RoomProps): JSX.Element => {
  return (
    <PageTemplate>
      <RedirectHome isCheckingAuth={isCheckingAuth}/>
      <Room />
    </PageTemplate>
  );
};

export default Lobby;