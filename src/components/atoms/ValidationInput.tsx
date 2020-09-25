import React, { memo } from 'react'
import styled from 'styled-components';

import Input from './Input';

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
  margin: 0.75rem 0;
  color: ${({ theme }) => theme.redColor};
  font: ${({ theme }) => theme.font12};
`;

interface ValidationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  inputEl?: React.RefObject<HTMLInputElement>
}

const ValidationInput = ({
  className,
  errorMessage,
  inputEl,
  onChange,
  type, 
  value,
  ...props
}: ValidationInputProps): JSX.Element => {
  return (
    <Wrapper className={className} isError={!!errorMessage}>
      <Input 
        inputEl={inputEl}
        onChange={onChange}
        type={type}
        value={value}      
        {...props}
      />
      {
        errorMessage && <ErrorText>{errorMessage}</ErrorText>
      }
    </Wrapper>
  )
}

export default memo(ValidationInput);
