import React from 'react';

import WithAuth from '@/components/hoc/WithAuth';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/components/organisms/LoginContainer';

const Login: React.FC = () => {
  return (
    <PageTemplate>
      <LoginContainer/>
    </PageTemplate>
  );
}

export default WithAuth(Login)