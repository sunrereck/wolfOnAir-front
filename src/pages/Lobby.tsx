import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import WithAuth from '@/components/hoc/WithAuth';

import PageTemplate from '@/components/templates/PageTemplate';
import RedirectHome from '@/components/atoms/RedirectHome';
import LobbyContainer from '@/components/organisms/LobbyContainer';

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

export default WithAuth(Lobby);