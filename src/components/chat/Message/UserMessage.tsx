import React from 'react'

import styled from 'styled-components';

interface UserMessageProps {
  message: string;
  userName: string;
  style: Object;
}

const UserMessage = ({
  message,
  userName,
  style
}: UserMessageProps): JSX.Element => {
  return (
    <UserMessageWrapper style={style}>
      {userName}: {message}
    </UserMessageWrapper>
  )
}

const UserMessageWrapper = styled.span<{style: Object}>`
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.75;
`;

export default UserMessage
