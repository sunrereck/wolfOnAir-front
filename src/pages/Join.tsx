import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import JoinContainer from '@/containers/user/JoinContainer';
import PageTemplate from '@/components/templates/PageTemplate';

const Join = ({history}: RouteComponentProps): JSX.Element => {
  return (
    <PageTemplate>
      <JoinContainer history={history}/>
    </PageTemplate>
  )
}

export default Join;