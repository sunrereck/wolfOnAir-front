import React from 'react';

import EmailAuthResult from '@/components/user/EmailAuthResult';

interface Props {
  email: string;
}

const EmailAuthResultContainer = ({email}: Props): JSX.Element => {
  return <EmailAuthResult />  
}

export default EmailAuthResultContainer;