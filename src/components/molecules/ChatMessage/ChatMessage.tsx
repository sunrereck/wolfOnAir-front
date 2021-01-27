import React from 'react';

import UserMessage from '@/components/atoms/UserMessage';
import SystemMessage from '@/components/atoms/SystemMessage';

interface ChatMessageProps {
  color?: string;
  message: string;
  style?: React.CSSProperties;
  type: 'system' | 'user';
  userName: string;
}

function ChatMessage({type, ...others}: ChatMessageProps): React.ReactElement {
  if (type === 'system') {
    return <SystemMessage {...others}/>
  }

  return <UserMessage {...others} />
};

export default ChatMessage;