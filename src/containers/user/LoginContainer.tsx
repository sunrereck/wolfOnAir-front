import React, { useState } from "react";
import { History } from 'history';

import { login } from "@/api/user";

import useReqeust from "@/hooks/useRequest";
import useValidationInput from "@/hooks/useValidationInput";

import LoginForm from "@/components/user/LoginForm";

function validateEmail(email: string) {
  if (!email) {
    return "필수 항목 입니다.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email)) {
    return "이메일 형식이 아닙니다.";
  }

  return "";
}

function validatePassword(password: string) {
  if (!password) {
    return "필수 항목 입니다.";
  }

  return "";
}

interface LoginContainerProps {
  history: History;
}

const LoginContainer = ({ history }: LoginContainerProps): JSX.Element => {
  const [loginFailMessage, setFailMessage] = useState('');
  const [isFailedLogin, setFailedLogin] = useState(false); 

  const [
    email,
    emailError,
    isValidEmail,
    onChangeEmail,
    onBlurEmail
  ] = useValidationInput("", validateEmail);
  const [
    password,
    passwordError,
    isValidPassword,
    onChangePassword,
    onBlurPassword
  ] = useValidationInput("", validatePassword);
  const [, onFetchLogin] = useReqeust(login, [], false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onFetchLogin(email, password);  

      history.replace('/');
    } catch (err) {
      let errorMessage = "통신이 불안정하여 로그인을 완료하지 못하였습니다.";

      if (err.response && err.response.data) {
        errorMessage = err.response.data.reason;
      }

      setFailedLogin(true);
      setFailMessage(errorMessage);
    }
  };
  
  const onToggleloginFailAlert = () => {
    setFailedLogin(prevState => !prevState);
  }

  return (
    <LoginForm
      email={email}
      emailError={emailError}
      isFailedLogin={isFailedLogin}
      isValid={isValidEmail && isValidPassword}
      loginFailMessage={loginFailMessage}
      onBlurEmail={onBlurEmail}
      onBlurPassword={onBlurPassword}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onToggleFailAlert={onToggleloginFailAlert}
      onSubmit={onSubmit}
      password={password}
      passwordError={passwordError}
    />
  );
};

export default LoginContainer;
