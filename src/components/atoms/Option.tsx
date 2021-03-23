import React from 'react';
import styled from 'styled-components';

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value: unknown;
  text: string;
}

function Option({
  text,
  ...others
}: OptionProps) {
  return (
    <Wrapper role="option" {...others}>{text}</Wrapper>
    );
};

const Wrapper = styled.div`
  padding: 0.5rem;
  background-color: ${({theme}) => theme.whiteColor};
`;

export default Option;