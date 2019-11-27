import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import LoginContainer from '@/containers/user/LoginContainer';

export default function Home() {
  return (
    <PageTemplate>
      <LoginContainer />
    </PageTemplate>
  );
}
