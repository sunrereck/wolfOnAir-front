import React from 'react';

import styled from 'styled-components';

interface UserNavProps {
  onLogout: () => void;
  userName: string;
}

const Nav = styled.nav`
  margin-left: auto;

  ul {
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }

  button {
    height: 21px;
    border: 0;
    background: none;
    font-size: 1rem;
    line-height: 21px;
    color: ${({theme}) => theme.textColor};
  }
`;

const UserNav = ({
  onLogout,
  userName
}: UserNavProps): JSX.Element => {
  return (
    <Nav>
      <ul>
        <li>
          {userName}
        </li>
        <li>
          <button type="button" onClick={onLogout}>로그아웃</button>
        </li>
      </ul>
    </Nav>
    
  )
}

export default UserNav;
