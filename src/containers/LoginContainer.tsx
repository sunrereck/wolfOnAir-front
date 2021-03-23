import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { loginUser } from "@/api/user";

import { setUser } from '@/modules/user';

import { getUrlQuery } from '@/utils/commons';

import useForm from '@/hooks/useForm';
import useRequest from "@/hooks/useRequest";

import LoginForm from "@/components/organisms/LoginForm";

type FormTypes = {
  email?: string;
  password?: string;
}

function validate(values: FormTypes): FormTypes {
  const errors = {} as FormTypes;

  if (!values.email) {
    errors.email = '필수 항목 입니다.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
    errors.email = '이메일 형식이 아닙니다.';
  }

  if (!values.password) {
    errors.password = '필수 항목 입니다.';
  }
  
  return errors;
}

function LoginContainer (): React.ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef
  ] = useForm({
    initialValues: {} as FormTypes,
    validate
  });
  const [
    loginUserData,
    loginUserError,
    isLoadingLoginUser,
    onLoginUser,
    onResetLoginUser
  ] = useRequest(loginUser, {} as {
    email: string;
    password: string;
  }, true);
  const query = getUrlQuery(location.search);


  const onSubmitLoginUser = () => {
    onLoginUser({
      email: values.email,
      password: values.password
    })
  }

  // componentDidUpdate - loginUserData
  useEffect(() => {
    if (!loginUserData) {
      return;
    }

    dispatch(setUser({
      uid: loginUserData.uid,
      userName: loginUserData.userName
    }));
    onResetLoginUser();

    if (!!query?.from) {
      history.replace(`${query.from}`);

      return;
    }

    history.replace('/');
  }, [
    dispatch,
    history,
    loginUserData,
    query?.from,
    onResetLoginUser,
  ]);

  return (
    <>

      <LoginForm
        email={values.email}
        emailError={errors.email}
        isSubmitting={isLoadingLoginUser}
        loginUserError={loginUserError}
        password={values.password} 
        passwordError={errors.password} 
        onBlur={onBlur}
        onChange={onChange} 
        onRef={onRef} 
        onSubmit={onSubmit(onSubmitLoginUser)} />
    </>
  );
};

export default LoginContainer;
