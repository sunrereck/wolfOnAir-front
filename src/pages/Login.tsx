import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/containers/user/LoginContainer';

export default function Home({history}: RouteComponentProps) {
  return (
    <PageTemplate>
      <LoginContainer history={history}/>
    </PageTemplate>
  );
}
