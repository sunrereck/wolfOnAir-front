import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignUpNav from './SignUpNav';
import UserNav from './UserNav';

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  padding: 0 1rem;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  align-items: center;
  box-sizing: border-box;

  a {
    color: ${props => props.theme.primaryColor};

    :visited {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const Logo = styled(Link)`
  display: block;
  margin-right: auto;
  font-size: 1rem;
`;

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
}

const Header = ({
  isLoggedIn,
  userName
}: HeaderProps): JSX.Element => (
  <Wrapper>
    <Logo to="/">늑대 온에어</Logo>
    {
      isLoggedIn ? <UserNav userName={userName} /> : <SignUpNav />
    }
  </Wrapper>
);

export default Header;
