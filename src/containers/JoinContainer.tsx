import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  checkAvailabilityEmail,
  checkAvailabiltyUser,
  joinUser,
  sendAuthEmail
} from "@/api/user";

import useForm from '@/hooks/useForm';
import useRequest from "@/hooks/useRequest";

import JoinForm from "@/components/molecules/JoinForm";

interface JoinContainerProps {
  history: History;
}

function validate(values: any): any {
  const errors = {} as any;

  if (!values.email) {
    errors.email = '필수 항목 입니다.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
    errors.email = '이메일 형식이 아닙니다.';
  }

  if (!values.password) {
    errors.password = '필수 항목 입니다.';
  } else if (values.password.length < 8 || values.password.length > 16) {
    errors.password = '비밀번호는 8자 이상 16자 이하이어야 합니다.'
  } else if (!values.password.match(
    /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
  )) {
    errors.password = '비밀번호는 숫자, 영문자, 특수문자를 포함해야합니다.'
  }

  if (!values.password2) {
    errors.password2 = '필수 항목 입니다.';
  } else if (values.password2 !== values.password) {
    errors.password2 = '비밀번호가 일치하지 않습니다.';
  }

  if (!values.userName) {
    errors.userName = "필수 항목 입니다.";
  } else if (values.userName.length < 2 || values.userName.length > 8) {
    errors.userName = "닉네임은 2글자 이상 8글자 이하여야 합니다.";
  }

  return errors;
 }

 async function asyncValidateEmail(email: string): Promise<Record<string, string>> {
   try {
    // const response = await checkAvailabilityEmail(email);

      // if (!response.data.isOk) {
      //   return { email: '이미 사용 중인 이메일 입니다.'};
      // }
  
      return {email: ''};
   } catch (err) {
    //  return {email: '알수없는 오류가 발생하여 통신에 실패하였습니다.'};
    return {email: ''};
  
   }
 }

 async function asyncValidateUserName(userName: string): Promise<Record<string, string>> {
   try {
    // const response = await checkAvailabiltyUser(userName);

    // if (!response.data.isOk) {
    //   return {userName: '이미 사용 중인 닉네임 입니다.'};
    // }

    return {userName: ''};
   } catch (err) {
    // return {userName: '알수없는 오류가 발생하여 통신에 실패하였습니다.'};
    return {userName: ''};

   }
 }

const JoinContainer = (): JSX.Element => {
  const history = useHistory();
  const [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef
  ] = useForm({
    initialValues: {
      email: '',
      password: '',
      password2: '',
      userName: ''
    },
    validate,
    asyncValidate: {
      email: asyncValidateEmail,
      userName: asyncValidateUserName
    },
  });
  const [
    joinUserData,
    joinUserError,
    ,
    onFetchJoinUser
  ] = useRequest(joinUser, {
    email: '',
    password: '',
    userName: ''
  }, true);

  return (
    <JoinForm
      email={values.email}
      emailError={errors.email}
      password={values.password}
      passwordError={errors.password}
      password2={values.password2}
      password2Error={errors.password2}
      userName={values.userName}
      userNameError={errors.userName}
      onChange={onChange}
      onBlur={onBlur}
      onRef={onRef}
      onSubmit={onSubmit(onFetchJoinUser)}
    />
  );
};

export default JoinContainer;
