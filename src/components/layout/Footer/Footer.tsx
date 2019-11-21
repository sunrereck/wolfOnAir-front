import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background-color: #dddddd;
  bottom: 0;
  left: 0;
  line-height: ${({ theme }) => theme.footerHeight};
  right: 0;
  text-align: center;

`;

const Footer = (): JSX.Element => (
  <StyledFooter>
    © 2019{` `}<a href="https://github.com/partyKyoung">partyKyoung</a>
  </StyledFooter>
);

export default Footer;
