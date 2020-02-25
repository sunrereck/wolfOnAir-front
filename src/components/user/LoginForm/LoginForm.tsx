import React from "react";
import styled from "styled-components";

import Alert from '@/components/ui/Alert';
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import ValidationInput from "@/components/ui/ValidationInput";

import UserTitle from "../UserTitle";

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 440px;
  box-sizing: border-box;

  .login-input {
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
  emailError: string;
  isFailedLogin: boolean;
  isValid: boolean;
  loginFailMessage: string;
  onBlurEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggleFailAlert: () => void;
  password: string;
  passwordError: string;
}

const LoginForm = ({
  email,
  emailError,
  isFailedLogin,
  isValid,
  loginFailMessage,
  onBlurEmail,
  onBlurPassword,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onToggleFailAlert,
  password,
  passwordError
}: LoginFormProps): JSX.Element => {
  return (
    <>
      <UserTitle>로그인</UserTitle>
      <Form onSubmit={onSubmit}>
        <ValidationInput
          className="login-input"
          type="email"
          name="email"
          errorMessage={emailError}
          onBlur={onBlurEmail}
          onChange={onChangeEmail}
          placeholder="이메일"
          value={email}
        />
        <ValidationInput
          className="login-input"
          type="password"
          name="password"
          errorMessage={passwordError}
          onBlur={onBlurPassword}
          onChange={onChangePassword}
          placeholder="비밀번호"
          value={password}
        />
        <Button type="submit" size="medium" color="primary" disabled={!isValid}>
          로그인
        </Button>
        <LinkButton color="primaryOutline" to="/user/join">
          회원가입
        </LinkButton>
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

// LoginForm.defaultProps = {

// }

export default LoginForm;
