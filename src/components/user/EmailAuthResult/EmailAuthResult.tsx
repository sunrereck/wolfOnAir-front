import React from 'react';

import EmailAuthFail from './EmailAuthFail'
import EmailAuthSuccess from './EmailAuthSuccess';

interface EmailAuthResultProps {
  isFail: boolean;
}

const EmailAuthResult = ({
  isFail
}: EmailAuthResultProps): JSX.Element => {
  if (isFail) {
    return <EmailAuthFail/>
  }

  return <EmailAuthSuccess />
}

export default EmailAuthResult;
