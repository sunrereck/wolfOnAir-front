import React from 'react';
import styled from 'styled-components';

import SignUpNav from './SignUpNav';

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  padding: 0 1rem;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  align-items: center;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  margin-right: auto;
  font-size: 16px;
`;

const Header = (): JSX.Element => (
  <Wrapper>
    <Logo>늑대 온에어</Logo>
    <SignUpNav />
  </Wrapper>
);

// Header.propTypes = {
//   isLoggedIn: PropTypes.bool
// }

export default Header;
