import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import WithAuth from '@/components/hoc/WithAuth';

import JoinContainer from '@/components/organisms/JoinContainer';
import PageTemplate from '@/components/templates/PageTemplate';

const Join = ({history}: RouteComponentProps): JSX.Element => {
  return (
    <PageTemplate>
      <JoinContainer history={history}/>
    </PageTemplate>
  )
}

export default WithAuth(Join);