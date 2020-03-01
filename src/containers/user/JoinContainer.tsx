import React, { useState } from "react";
import { History } from "history";
import {
  checkAvailabilityEmail,
  checkAvailabiltyUser,
  joinUser,
  sendAuthEmail
} from "@/api/user";

import useValidationInput from "@/hooks/useValidationInput";
import useRequet from "@/hooks/useRequest";

import JoinForm from "@/components/user/JoinForm";

interface JoinContainerProps {
  history: History;
}

interface JoinFormState {
  email: string;
  password: string;
  password2: string;
  userName: string;
}


async function validateEmail(email: string) {
  if (!email) {
    return '필수 항목 입니다.';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  try {
    const response = await checkAvailabilityEmail(email);

    if (!response.data.isOk) {
      return '이미 사용 중인 이메일 입니다.';
    }

    return '';

  } catch(err) {
    let message = '통신이 불안정하여 이메일 중복체크를 완료하지 못하였습니다.';

    if (err.response && err.response.status === 400) {
      message = '필수값이 누락되어 이메일 중복체크를 완료하지 못하였습니다.';
    }

    return message;
  }
}

function validatePassword(password: string) {
  if (password === '') {
    return '필수 정보입니다.';
  }

  if (password.length < 8 || password.length > 16) {
    return '비밀번호는 8자 이상 16자 이하이어야 합니다.';
  }

  if (
    !password.match(/^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  ) {
    return '비밀번호는 숫자, 영문자, 특수문자를 포함해야합니다.';
  }

  return '';  
}

function validatePassword2(password2: string, password: string) {
  if (!password2) {
    return '필수 정보입니다.';
  }
  
  if (password !== password2) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return '';
}

async function validateUserName(userName: string) {
  if (!userName) {
    return '필수 항목 입니다.';
  }

  if (userName.length < 2 || userName.length > 8) {
    return '닉네임은 2글자 이상 8글자 이하여야 합니다.';
  }

  try {
    const response = await checkAvailabiltyUser(userName);

    if (!response.data.isOk) {
      return '이미 사용 중인 닉네임 입니다.';
    }

    return '';

  } catch(err) {
    let message = '통신이 불안정하여 닉네임 중복체크를 완료하지 못하였습니다.';

    if (err.response && err.response.status === 400) {
      message = '필수값이 누락되어 닉네임 중복체를 완료하지 못하였습니다.';
    }

    return message;
  }  
}

const JoinContainer = ({ history }: JoinContainerProps): JSX.Element => {
  const [joinFailMessage, setJoinFailMessage] = useState('');
  const [isFailedJoin, setFaildJoin] = useState(false); 
  const [isSubmitting, setSubmit] = useState(false);
  const [email, emailError, isValidEmail, onChangeEmail, onBlurEmail, onSetEmailError] = useValidationInput('', validateEmail);
  const [password, passwordError, isValidPassword, onChangePassword, onBlurPassowrd, onSetPasswordError] = useValidationInput('', validatePassword);
  const [password2, password2Error, isValidPassword2, onChangePassword2,, onSetPassword2Error, onResetPassword2] = useValidationInput('');
  const [userName, userNameError, isValidUserName, onChangeUserName, onBlurUserName, onSetUserNameError] = useValidationInput('', validateUserName);
  const [, onJoinUser] = useRequet(joinUser, [], false);
  const [, onSendAuthEmail] = useRequet(sendAuthEmail, [], false);

  const onChangePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    onResetPassword2();
    onChangePassword(e);
  }

  const onBlurPassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorPassword2 = validatePassword2(e.target.value, password);

    onSetPassword2Error(!errorPassword2, errorPassword2);
  }

  const onSubmitJoinForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isValidEmail) {
      const errorMessage = await validateEmail(email);

      onSetEmailError(errorMessage === '', errorMessage);

      return;
    }

    if (!isValidPassword) {
      const errorMessage = validatePassword(password);

      onSetPasswordError(errorMessage === '', errorMessage);

      return;
    }

    if (!isValidPassword2) {
      const errorMessage = validatePassword2(password2, password);

      onSetPassword2Error(errorMessage === '', errorMessage);

      return;
    }

    if (!isValidUserName) {
      const errorMessage = await validateUserName(userName);

      onSetUserNameError(errorMessage === '', errorMessage);

      return;
    }

    setSubmit(true);

    try {
      await onJoinUser({
        email,
        password,
        userName
      });

      await onSendAuthEmail(email);

      history.push(`/user/join/${email}/send-email`);

    } catch (err) {
      let message = '통신이 불안정하여 회원가입을 완료하지 못하였습니다.';
    
      if (err.response && err.response.status === 400) {
        message = '필수값이 누락되어 회원가입을 완료하지 못하였습니다.';
      }

      setFaildJoin(true);
      setJoinFailMessage(message);
      setSubmit(false);
    }
  };

  const onToggleJoinFailAlert = () => {
    setFaildJoin(prevState => !prevState);
  }

  return (
    <JoinForm
      email={email}
      emailError={emailError}
      isFailedJoin={isFailedJoin}
      isSubmit={isSubmitting}
      joinFailMessage={joinFailMessage}
      password={password}
      password2={password2}
      userName={userName}
      onBlurEmail={onBlurEmail}
      onBlurPassword={onBlurPassowrd}
      onBlurPassword2={onBlurPassword2}
      onBlurUserName={onBlurUserName}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePasswords}
      onChangePassword2={onChangePassword2}
      onChangeUserName={onChangeUserName}
      onSubmit={onSubmitJoinForm}
      onToggleJoinFailAlert={onToggleJoinFailAlert}
      passwordError={passwordError}
      password2Error={password2Error}
      userNameError={userNameError}
    />
  );
};

export default JoinContainer;
