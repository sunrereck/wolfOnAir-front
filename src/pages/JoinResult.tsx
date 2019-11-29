import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import JoinResultContainer from '@/containers/user/JoinResultContainer';

const JoinResult = ({match}: RouteComponentProps<{email: string}>): JSX.Element => {
  return (
    <PageTemplate>
      <JoinResultContainer email={match.params.email} />
    </PageTemplate>
  )
}

export default JoinResult;
