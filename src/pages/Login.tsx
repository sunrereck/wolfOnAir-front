import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/containers/user/LoginContainer';

export default function Home({history, location}: RouteComponentProps) {
  return (
    <PageTemplate>
      <LoginContainer history={history} location={location}/>
    </PageTemplate>
  );
}
