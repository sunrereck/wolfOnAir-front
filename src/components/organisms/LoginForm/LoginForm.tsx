import React from "react";
import styled from "styled-components";
import { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/errors';

import useForm from '@/hooks/useForm';

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import JoinWrapper from '@/components/molecules/JoinWrapper';
import ValidationInput from "@/components/molecules/ValidationInput";

interface ValidateLoginParams {
  email?: string;
  password?: string;
}

function validateLogin({ email, password }: ValidateLoginParams): ValidateLoginParams {
  const errors: ValidateLoginParams = {};

  if (!email) {
    errors.email = "필수 항목 입니다";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email)) {
    errors.email = "이메일 형식이 아닙니다";
  }

  if (!password) {
    errors.password = "필수 항목 입니다";
  }

  return errors;
}

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
<<<<<<< HEAD
  const [
    values,
    errors,
    ,
    onChange,
    onBlur
  ] = useForm({}, validateLogin);
  const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <h2>로그인</h2>
      <Form>
        <ValidationInput 
          placeholder="이메일" 
          value={values?.email || ''}
          errorMessage={errors.email}
          onBlur={onBlur}
          onChange={onChange}
          />
        <ValidationInput 
          placeholder="패스워드" 
          value={values.password}
          errorMessage={errors.password}
          onBlur={onBlur}
          onChange={onChange}
          />
          <Button type="submit" onMouseDown={onIgnoreBlurEvent}>
=======
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
            color="primary"
            variant="contained"
            width="100%"
            height="3rem"
            disabled={isSubmitting}
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}>
>>>>>>> 7e6266b3434e343b93847e35faed3653f455c3d8
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
