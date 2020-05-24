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
  }

  li {
    margin-right: 1rem;
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
