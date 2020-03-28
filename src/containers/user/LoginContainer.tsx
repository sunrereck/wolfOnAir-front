import React, { useState } from "react";
import { History } from 'history';

import { login } from "@/api/user";

import useReqeust from "@/hooks/useRequest";
import useValidationInput from "@/hooks/useValidationInput";

import LoginForm from "@/components/user/LoginForm";

function validateEmail(email: string): string {
  if (!email) {
    return "필수 항목 입니다.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email)) {
    return "이메일 형식이 아닙니다.";
  }

  return "";
}

function validatePassword(password: string): string {
  if (!password) {
    return "필수 항목 입니다.";
  }

  return "";
}

interface LoginContainerProps {
  history: History;
}

const LoginContainer = ({ history }: LoginContainerProps): JSX.Element => {
  const [isFailedLogin, setFailedLogin] = useState(false); 
  const [isFetching, setFetching] = useState(false);
  const [loginFailMessage, setFailMessage] = useState('');
  const [
    email,
    emailError,
    emailEl,
    ,
    onChangeEmail,
    onBlurEmail,
    onSetEmailError
  ] = useValidationInput("", validateEmail);
  const [
    password,
    passwordError,
    passwordEl,
    ,
    onChangePassword,
    onBlurPassword,
    onSetPasswordError
  ] = useValidationInput("", validatePassword);
  const [, onFetchLogin] = useReqeust(login, [], false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!!emailError) {
      onSetEmailError(emailError === '', emailError);

      return;
    }

    if (!!passwordError) {

      onSetPasswordError(passwordError === '', passwordError);

      return;
    }

    setFetching(true);

    try {
      await onFetchLogin(email, password);  

      history.replace('/');
    } catch (err) {
      let errorMessage = "통신이 불안정하여 로그인을 완료하지 못하였습니다.";

      if (err.response && err.response.data) {
        errorMessage = err.response.data.reason;
      }

      setFetching(false);
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
      emailEl={emailEl}
      emailError={emailError}
      isFailedLogin={isFailedLogin}
      isFetching={isFetching}
      loginFailMessage={loginFailMessage}
      onBlurEmail={onBlurEmail}
      onBlurPassword={onBlurPassword}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onToggleFailAlert={onToggleloginFailAlert}
      onSubmit={onSubmit}
      password={password}
      passwordEl={passwordEl}
      passwordError={passwordError}
    />
  );
};

export default LoginContainer;
