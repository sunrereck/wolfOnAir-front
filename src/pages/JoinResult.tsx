import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import JoinResultContainer from '@/containers/user/JoinResultContainer';
import PageTemplate from '@/components/templates/PageTemplate';

interface MatchParams {
  email: string;
}

const JoinResult = ({ match }: RouteComponentProps<MatchParams>): JSX.Element => {
  return (
    <PageTemplate>
      <JoinResultContainer email={match.params.email} />
    </PageTemplate>
  )
}

export default JoinResult;