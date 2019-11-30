import React from 'react';

import JoinResult from '@/components/user/EmailAuthResult';

interface Props {
  email: string;
}

const EmailAuthResultContainer = ({email}: Props): JSX.Element => {
  return <JoinResult />  
}

export default EmailAuthResultContainer;