import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import HeaderContainer from '@/containers/layout/HeaderContainer';
import ScrollTop from '@/components/layout/ScrollToTop';

interface PageTemplateProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
`;

const PageTemplate: React.SFC<PageTemplateProps> = ({ children }) => {
  return (
    <React.Fragment>
      <ScrollTop />
      <HeaderContainer />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  );
};

PageTemplate.defaultProps = {
  children: null
};

export default PageTemplate;
