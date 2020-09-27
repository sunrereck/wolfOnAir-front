import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Link from "@/components/atoms/Link";
import ValidationInput from "@/components/atoms/ValidationInput";
import Alert from '@/components/molecules/Alert';

import UserTitle from "../UserTitle";

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 440px;
  box-sizing: border-box;

  div {
    margin-bottom: 1rem;
  }

  button,
  a {
    width: 100%;
    text-align: center;
  }

  button {
    margin-bottom: 1rem;
  }
`;

interface LoginFormProps {
  email: string;
  emailEl: React.RefObject<HTMLInputElement>;
  emailError: string;
  isFailedLogin: boolean;
  isFetching: boolean;
  loginFailMessage: string;
  onBlurEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggleFailAlert: () => void;
  password: string;
  passwordEl: React.RefObject<HTMLInputElement>;
  passwordError: string;
}

const LoginForm = ({
  email,
  emailEl,
  emailError,
  isFailedLogin,
  isFetching,
  loginFailMessage,
  onBlurEmail,
  onBlurPassword,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onToggleFailAlert,
  password,
  passwordEl,
  passwordError
}: LoginFormProps): JSX.Element => {
  const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  
  return (
    <>
      <UserTitle>로그인</UserTitle>
      <Form onSubmit={onSubmit}>
        <ValidationInput
          type="email"
          name="email"
          inputEl={emailEl}
          errorMessage={emailError}
          onBlur={onBlurEmail}
          onChange={onChangeEmail}
          placeholder="이메일"
          value={email}
        />
        <ValidationInput
          type="password"
          name="password"
          errorMessage={passwordError}
          onBlur={onBlurPassword}
          onChange={onChangePassword}
          inputEl={passwordEl}
          placeholder="비밀번호"
          value={password}
        />
        <Button type="submit" onMouseDown={onIgnoreBlurEvent}>
          { isFetching ? '로그인 중...' : '로그인' }
        </Button>
        <Link
         style={{
           display: "block",
           width: "100",
           height: "3rem",
           lineHeight: "3rem"
         }}
         variant="outlined" to="/user/join">
          회원가입
        </Link>
      </Form>
      <Alert 
        title="로그인 실패"
        isShown={isFailedLogin}
        onClick={onToggleFailAlert}
        onClose={onToggleFailAlert}
      >
        {loginFailMessage}
      </Alert>
    </>
  );
};

export default LoginForm;
