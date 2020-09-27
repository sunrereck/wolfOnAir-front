import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import RedirectHome from '@/components/atoms/RedirectHome';
import Room from '@/components/molecules/Room';
import PageTemplate from '@/components/templates/PageTemplate';

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