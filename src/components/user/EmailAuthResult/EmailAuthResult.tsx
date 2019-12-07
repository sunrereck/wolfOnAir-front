import React from 'react';

import EmailAuthFail from './EmailAuthFail'
import EmailAuthSuccess from './EmailAuthSuccess';

const EmailAuthResult = () => {
  if (true) {
    return <EmailAuthFail/>
  }

  return <EmailAuthSuccess />
}

export default EmailAuthResult;
