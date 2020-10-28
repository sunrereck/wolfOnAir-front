import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '@/components/organisms/HeaderContainer';

import useScrollToTop from '@/hooks/useScrollToTop';

interface PageTemplateProps {
  children: React.ReactNode;
}

function PageTemplate({
  children
}: PageTemplateProps): React.ReactElement {
  useScrollToTop();

  return (
    <React.Fragment>
      <HeaderContainer />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  );
} 
const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
`;

export default PageTemplate;
