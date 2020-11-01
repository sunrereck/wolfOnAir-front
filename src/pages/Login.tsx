import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/containers/LoginContainer';

const Login: React.FC = () => {
  return (
    <PageTemplate>
      <LoginContainer />
    </PageTemplate>
  );
}

export default Login