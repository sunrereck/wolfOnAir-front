import React from 'react';

import styled, { css } from 'styled-components';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({
  level = 1,
  ...others
}: HeadingProps): React.ReactElement {
  if (level === 6) {
    return <H6 {...others} />
  }
  
  if (level === 5) {
    return <H5 {...others} />
  }

  if (level === 4) {
    return <H4 {...others} />
  }

  if (level === 3) {
    return <H3 {...others} />
  }

  if (level === 2) {
    return <H2 {...others} />
  }

  return <H1 {...others} />
};

const styles = css`
  font-weight: 600;
  line-height: 1;
`;

const H1 = styled.h1`
  ${styles}
  font-size: 2rem;
`;

const H2 = styled.h2`
  ${styles}
  font-size: 1.625rem;
`;

const H3 = styled.h3`
  ${styles}
  font-size: 1.5rem;
`;

const H4 = styled.h4`
  ${styles}
  font-size: 1.25rem;
`;

const H5 = styled.h5`
  ${styles}
  font-size: 1.125rem;
`;

const H6 = styled.h6`
  ${styles}
  font-size: 1rem;
`;



export default Heading;