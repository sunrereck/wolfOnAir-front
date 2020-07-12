import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignUpNav from './SignUpNav';
import UserNav from './UserNav';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  userName: string;
}

const Header = ({
  isLoggedIn,
  onLogout,
  userName
}: HeaderProps): JSX.Element => (
  <Wrapper>
    <Logo to="/"><strong><img src="/logo.svg" alt="늑대 온에어" /></strong></Logo>
    {
      isLoggedIn ? <UserNav onLogout={onLogout} userName={userName} /> : <SignUpNav />
    }
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  padding: 0 1.125rem;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background-color: #dddddd;
  align-items: center;
  box-sizing: border-box;
  font-size: 1rem;

  a {
    color: ${props => props.theme.textColor};

    :visited {
      color: ${props => props.theme.textColor};
    }
  }

  strong {
    font-weight: 600;
  }
`;

const Logo = styled(Link)`
  display: block;
  margin-right: auto;
`;

export default Header;
