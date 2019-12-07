import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  margin: 2rem auto 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
`;

interface UserTitleProps {
  children: React.ReactNode
}

const UserTitle = ({children}: UserTitleProps): JSX.Element => {
  return <Title>{children}</Title>
}

export default UserTitle;