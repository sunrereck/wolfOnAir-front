import Join from '@/pages/Join';
import React from 'react';

import styled from 'styled-components';

import Heading from '@/components/atoms/Heading';

interface JoinWrapperProps {
    children: React.ReactNode;
    title: string;
}

function JoinWrapper({
    children,
    title
}: JoinWrapperProps): React.ReactElement {
    return (
        <>
            <StyledHeading>{title}</StyledHeading>
            <Wrapper>
                {children}
            </Wrapper>
        </>
    )
}

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-align: center;
`;

const Wrapper = styled.div`
    width: 100%;
`;

export default JoinWrapper;