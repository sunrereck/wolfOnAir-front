import React from 'react'

import styled from 'styled-components';

interface UserMessageProps {
  message: string;
  userName: string;
}

const UserMessage = ({
  message,
  userName
}: UserMessageProps): JSX.Element => {
  return (
    <UserMessageWrapper>
      {userName}: {message}
    </UserMessageWrapper>
  )
}

const UserMessageWrapper = styled.span`
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.75;
`;

export default UserMessage
