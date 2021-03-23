import React from 'react';

import PageTemplate from '@/components/templates/PageTemplate';
import JoinUserAuthResultContainer from '@/containers/JoinUserAuthResultContainer';

function JoinUserAuthResult (): React.ReactElement {
  return (
    <PageTemplate>
      <JoinUserAuthResultContainer />
    </PageTemplate>
  )
}

export default JoinUserAuthResult;
