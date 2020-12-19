import React, { memo } from 'react'
import styled from 'styled-components';

import Input from '@/components/atoms/Input';

interface ValidationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  inputEl?: any;
}

const ValidationInput = ({
  className,
  errorMessage,
  inputEl,
  ...others
}: ValidationInputProps): JSX.Element => {
  return (
    <Wrapper className={className} isError={!!errorMessage}>
      <Input inputEl={inputEl} {...others} />
      {
        errorMessage && <ErrorText>{errorMessage}</ErrorText>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div<{isError?: boolean}>`
  display: flex;
  flex-wrap: wrap;
  border-radius: 2px;

  input { 
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem;
    border: 1px solid ${({theme}) => theme.borderColor};
    border-radius: 2px;
    font-size: 1rem;

    ${({isError, theme}) => isError && `
      border: 1px solid ${theme.redColor};
    `
  }
`;

const ErrorText = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.redColor};
  font: ${({ theme }) => theme.font12};
`;

export default memo(ValidationInput);
