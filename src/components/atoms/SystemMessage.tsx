import React from 'react';
import styled from 'styled-components';

import chatColors from '@/styles/chatColors';

interface SystemMessageProps {
  message: string;
  style?: React.CSSProperties;
}

function ChatMessage({
  message,
  style
}: SystemMessageProps) {
  return (
    <Wrapper style={style}>
      <span>{message}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  span {
    font-size: 1rem;
    color: ${(chatColors.teal)};
  }
`;

export default ChatMessage;