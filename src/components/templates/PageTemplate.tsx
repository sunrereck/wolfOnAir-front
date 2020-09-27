import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import ScrollTop from '@/components/atoms/ScrollToTop';
import HeaderContainer from '@/components/organisms/HeaderContainer';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ children }) => {
  return (
    <React.Fragment>
      <ScrollTop />
      <HeaderContainer />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
`;

export default PageTemplate;
