import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import HeaderContainer from '@/containers/layout/HeaderContainer';
import Footer from '@/components/layout/Footer';
import ScrollTop from '@/components/layout/ScrollToTop';

interface PageTemplateProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: ${theme.footerHeight};
`;

const PageTemplate: React.SFC<PageTemplateProps> = ({ children }) => {
  return (
    <React.Fragment>
      <ScrollTop />
      <HeaderContainer />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </React.Fragment>
  );
};

PageTemplate.defaultProps = {
  children: null
};

export default PageTemplate;
