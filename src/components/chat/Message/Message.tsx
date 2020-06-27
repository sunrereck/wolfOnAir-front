import React, { memo } from 'react';

import UserMessage from './UserMessage';
import SystemMessage from './SystemMessage';

interface MessageProps {
  isSystem: boolean;
  message: string;
  userName?: string;
}

const Message = ({
  isSystem,
  message,
  userName
}: MessageProps): JSX.Element => {
  if (isSystem) {
    return <SystemMessage message={message} />
  }

  return (
    <UserMessage />
  )
};

export default memo(Message);