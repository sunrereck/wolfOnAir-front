import React from 'react';
import styled from 'styled-components';

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
  font-size: 16px;
`;

const Header = (): JSX.Element => (
  <Wrapper>
    <Logo>늑대 온에어</Logo>
  </Wrapper>
);

// Header.propTypes = {
//   isLoggedIn: PropTypes.bool
// }

export default Header;
