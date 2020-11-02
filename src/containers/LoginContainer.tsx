import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom';

import { AxiosError } from 'axios';

import { login } from "@/api/user";

import { setUser } from '@/modules/user';

import { getUrlQuery } from '@/utils/commons';

import useRequest from '@/hooks/useRequest';
import useValidationInput from "@/hooks/useValidationInput";

import LoginForm from "@/components/organisms/LoginForm";

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

function getErrorMessage(err: AxiosError): string {
  if (err.response && err.response.data) {
    return err.response.data.reason;
  }

  return "통신이 불안정하여 로그인을 완료하지 못하였습니다.";
}

interface LoginParams {
  email: string;
  password: string;
}

const LoginContainer = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginFailMessage, setFailMessage] = useState('');
  const [state, onLogin, onReset] = useRequest(login, {} as LoginParams, true);
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

    try {
      // 
      
    } catch (err) {
      setFailMessage(getErrorMessage(err));
    }
  };

  return (
    <LoginForm />
  );
};

export default LoginContainer;
