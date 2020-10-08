import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import WithAuth from '@/components/hoc/WithAuth';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/components/organisms/LoginContainer';

function Login({history, location}: RouteComponentProps) {
  return (
    <PageTemplate>
      <LoginContainer history={history} location={location}/>
    </PageTemplate>
  );
}

export default WithAuth(Login)