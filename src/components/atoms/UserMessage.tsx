import React from 'react';
import styled from 'styled-components';

import chatColors from '@/styles/chatColors';

interface UserMessageProps {
  color?: string;
  style?: React.CSSProperties;
  message: string;
  userName: string;
}

function UserMessage({
  color = chatColors.black,
  message,
  style,
  userName,
}: UserMessageProps) {
  return (
    <Wrapper style={style}>
      <UserName color={color}>{userName}</UserName>
      <Message>{`: ${message}`}</Message>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
`;

const UserName = styled.span<{color: string}>`
  margin-right: 0.5rem;
  color: ${({color}) => color};
`;

const Message = styled.span``;

export default UserMessage;