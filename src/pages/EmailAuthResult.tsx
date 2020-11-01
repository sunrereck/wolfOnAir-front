import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageTemplate from '@/components/templates/PageTemplate';
import EmailAuthResultContainer from '@/containers/EmailAuthResultContainer';

const EmailAuthResult = ({match}: RouteComponentProps<{email: string}>): JSX.Element => {
  return (
    <PageTemplate>
      <EmailAuthResultContainer email={match.params.email} />
    </PageTemplate>
  )
}

export default EmailAuthResult;
