import React from 'react'
import styled from 'styled-components';

import Input from '../Input';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  input { 
    width: 100%;
  }
`;

const ErrorText = styled.span`
  display: inline-block;
  width: 100%;
  margin-bottom: 0.5px;
  padding: 0 0.5px;
  color: ${({ theme }) => theme.redColor};
  font: ${({ theme }) => theme.font12};
`;

interface ValidationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage: string;
}

const ValidationInput = ({
  className,
  errorMessage,
  onChange,
  type, 
  value,
  ...props
}: ValidationInputProps): JSX.Element => {
  return (
    <Wrapper className={className}>
      <Input 
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

export default ValidationInput;
