import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Nav = styled.nav`
  margin-left: auto;

  ul {
    display: flex;
  }

  li {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const SignupNav = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/user/login">
            로그인
          </Link>
        </li>
        <li>
          <Link to="/user/join">
            회원가입
          </Link>
        </li>
      </ul>
    </Nav>
  )
}

export default SignupNav;
