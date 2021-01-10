import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import {
  checkAvailabilityEmail,
  checkAvailabiltyUser,
  joinUser,
  sendJoinAuthEmail
} from "@/api/user";

import useForm from '@/hooks/useForm';
import useRequest from "@/hooks/useRequest";

import { getErrorMessage } from '@/utils/errors';

import JoinForm from "@/components/organisms/JoinForm";

type FormTypes = {
  email?: string;
  password?: string;
  password2?: string;
  userName?: string;
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
    const response = await checkAvailabilityEmail(email);

      if (!response.data.isOk) {
        return { email: '이미 사용 중인 이메일 입니다.'};
      }
  
      return {email: ''};
   } catch (err) {
     return {email: '알수없는 오류가 발생하여 통신에 실패하였습니다.'};  
   }
 }

 async function asyncValidateUserName(userName: string): Promise<Record<string, string>> {
   try {
    const response = await checkAvailabiltyUser(userName);

    if (!response.data.isOk) {
      return {userName: '이미 사용 중인 닉네임 입니다.'};
    }

    return {userName: ''};
   } catch (err) {
    return {userName: '알수없는 오류가 발생하여 통신에 실패하였습니다.'};
   }
 }

function JoinContainer(): React.ReactElement {
  const [isShownAlert, setIsShownAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef
  ] = useForm({
    initialValues: {} as FormTypes,
    validate,
    asyncValidate: {
      email: asyncValidateEmail,
      userName: asyncValidateUserName
    },
  });
  const [
    joinUserData,
    joinUserError,
    isLoadingJoinUser,
    onJoinUser,
    onResetJoinUser
  ] = useRequest(joinUser, {} as {
    email: string;
    password: string;
    userName: string;
  }, true);
  const [
    sendAuthEmailData,
    sendAuthEmailError,
    isLoadingSendAuthEmail,
    onSendJoinAuthEmail
  ] = useRequest(sendJoinAuthEmail, '' as string, true);
  
  // componentDidUpdate - joinUserData
  useEffect(() => {
    if (!joinUserData) {
      return;
    }

    onSendJoinAuthEmail(values.email);
    onResetJoinUser();
  })

  // componentDidUpdate - joinUserError
  useEffect(() => {
    if (!joinUserError) {
      return;
    }

    setIsShownAlert(true);
    setAlertMessage(getErrorMessage(joinUserError));
    onResetJoinUser();

    return;
  }, [joinUserError, onResetJoinUser]);

  // alert 닫기
  const onCloseAlert = () => {
    setIsShownAlert(false);
    setAlertMessage('');
  }

  // 회원가입 
  const onSubmitJoinUser = () => {
    onJoinUser({
      email: values.email,
      password: values.password,
      userName: values.userName
    })
  }

  return (
    <>
      {
        !!sendAuthEmailData && (
          <Redirect to={`/user/join/${values.email}/send-email?result=success`}/>
        )  
      }
      {      
        !!sendAuthEmailError && (
          <Redirect to={`/user/join/${values.email}/send-email?result=fail`}/>
        )
      }
      <JoinForm
        alertMessage={alertMessage}
        email={values.email}
        emailError={errors.email}
        isShownAlert={isShownAlert}
        isSubmitting={isLoadingJoinUser || isLoadingSendAuthEmail}
        password={values.password}
        passwordError={errors.password}
        password2={values.password2}
        password2Error={errors.password2}
        userName={values.userName}
        userNameError={errors.userName}
        onBlur={onBlur}
        onChange={onChange}
        onCloseAlert={onCloseAlert}
        onRef={onRef}
        onSubmit={onSubmit(onSubmitJoinUser)}
      />
    </>
  );
};

export default JoinContainer;
