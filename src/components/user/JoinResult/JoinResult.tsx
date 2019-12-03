import React from 'react';

import JoinFail from './JoinFail';
import JoinSuccess from './JoinSuccess';

const JoinResult = (): JSX.Element => {
  if (true) {
    return <JoinFail/>
  }

  return (
    <JoinSuccess />
  )
}

export default JoinResult;
