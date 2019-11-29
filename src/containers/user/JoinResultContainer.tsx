import React from 'react';

import JoinResult from '@/components/user/JoinResult';

interface Props {
  email: string;
}

const JoinResultContainer = ({email}: Props): JSX.Element => {
  return <JoinResult />  
}

export default JoinResultContainer;