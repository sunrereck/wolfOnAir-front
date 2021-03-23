import React from 'react';

import styled from 'styled-components';

import Button from '@/components/atoms/Button';

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
          <Button color="primary" to="/user/login">
            로그인
          </Button>
        </li>
        <li>
          <Button color="primary" to="/user/join">
            회원가입
          </Button>
        </li>
      </ul>
    </Nav>
  )
}

export default SignupNav;
