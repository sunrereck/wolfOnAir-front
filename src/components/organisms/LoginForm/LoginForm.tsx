import React from "react";
import styled from "styled-components";
import { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/errors';

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import JoinWrapper from '@/components/molecules/JoinWrapper';
import ValidationInput from "@/components/molecules/ValidationInput";

interface LoginFormProps {
  email: string;
  emailError: string;
  isSubmitting: boolean;
  loginUserError: AxiosError | null;
  password: string;
  passwordError: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRef: (ref: any) => void;
  onSubmit: () => void;
}

function LoginForm({
  email,
  emailError,
  isSubmitting,
  loginUserError,
  password,
  passwordError,
  onBlur,
  onChange,
  onRef,
  onSubmit
}: LoginFormProps): React.ReactElement {
  return (
    <>
      <JoinWrapper title="로그인">
        <StyledForm onSubmit={onSubmit}>
          <ValidationInput 
            type="email"
            name="email"
            placeholder="이메일" 
            errorMessage={emailError}
            value={email || ''}
            onChange={onChange}
            onBlur={onBlur}
            inputEl={onRef} />
          <ValidationInput 
            type="password"
            name="password"
            placeholder="패스워드" 
            errorMessage={passwordError}          
            value={password || ''}
            onChange={onChange}
            onBlur={onBlur}
            inputEl={onRef} />
          {
            !!loginUserError && (
              <ErrorMessage>{getErrorMessage(loginUserError)}</ErrorMessage>
            )
          }
          <Button
            type="submit"
            disabled={isSubmitting}
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
            로그인
          </Button>
        </StyledForm>
      </JoinWrapper>
    </>
  );
}

const StyledForm = styled(Form)`
  button {
    width: 100%; 
  }

  > div {
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
  color: ${({theme}) => theme.redColor};
`;

export default LoginForm;
