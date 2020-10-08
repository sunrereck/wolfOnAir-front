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

async function validateEmail(email: string): Promise<string> {
  if (!email) {
    return "필수 항목 입니다.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email)) {
    return "이메일 형식이 아닙니다.";
  }

  try {
    const response = await checkAvailabilityEmail(email);

    if (!response.data.isOk) {
      return "이미 사용 중인 이메일 입니다.";
    }

    return "";
  } catch (err) {
    let message = "통신이 불안정하여 이메일 중복체크를 완료하지 못하였습니다.";

    if (err.response && err.response.status === 400) {
      message = "필수값이 누락되어 이메일 중복체크를 완료하지 못하였습니다.";
    }

    return message;
  }
}

function validatePassword(password: string): string {
  if (password === "") {
    return "필수 정보입니다.";
  }

  if (password.length < 8 || password.length > 16) {
    return "비밀번호는 8자 이상 16자 이하이어야 합니다.";
  }

  if (
    !password.match(
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
    )
  ) {
    return "비밀번호는 숫자, 영문자, 특수문자를 포함해야합니다.";
  }

  return "";
}

function validatePassword2(password2: string, password: string): string {
  if (!password2) {
    return "필수 정보입니다.";
  }

  if (password !== password2) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
}

async function validateUserName(userName: string): Promise<string> {
  if (!userName) {
    return "필수 항목 입니다.";
  }

  if (userName.length < 2 || userName.length > 8) {
    return "닉네임은 2글자 이상 8글자 이하여야 합니다.";
  }

  try {
    const response = await checkAvailabiltyUser(userName);

    if (!response.data.isOk) {
      return "이미 사용 중인 닉네임 입니다.";
    }

    return "";
  } catch (err) {
    let message = "통신이 불안정하여 닉네임 중복체크를 완료하지 못하였습니다.";

    if (err.response && err.response.status === 400) {
      message = "필수값이 누락되어 닉네임 중복체를 완료하지 못하였습니다.";
    }

    return message;
  }
}

const JoinContainer = ({ history }: JoinContainerProps): JSX.Element => {
  const [joinFailMessage, setJoinFailMessage] = useState("");
  const [isFailedJoin, setFaildJoin] = useState(false);
  const [isSubmitting, setSubmit] = useState(false);
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
    onBlurPassowrd,
    onSetPasswordError
  ] = useValidationInput("", validatePassword);
  const [
    password2,
    password2Error,
    password2El,
    ,
    onChangePassword2,
    onBlurPassword2,
    onSetPassword2Error,
    onResetPassword2
  ] = useValidationInput("", (password2: string) => {
    return validatePassword2(password2, password);
  });
  const [
    userName,
    userNameError,
    userNameEl,
    ,
    onChangeUserName,
    onBlurUserName,
    onSetUserNameError
  ] = useValidationInput("", validateUserName);
  const [, onJoinUser] = useRequet(joinUser, [], true);
  const [, onSendAuthEmail] = useRequet(sendAuthEmail, [], true);

  const onChangePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    onResetPassword2();
    onChangePassword(e);
  };

  const onSubmitJoinForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = await validateEmail(email);
    const passwordError = validatePassword(password);
    const password2Error = validatePassword2(password2, password);
    const userNameError = await validateUserName(userName);

    if (emailError) {
      onSetEmailError(emailError === "", emailError);

      return;
    }

    if (passwordError) {
      onSetPasswordError(passwordError === "", passwordError);

      return;
    }

    if (password2Error) {
      onSetPassword2Error(password2Error === "", password2Error);

      return;
    }

    if (userNameError) {
      onSetUserNameError(userNameError === "", userNameError);

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
      let message = "통신이 불안정하여 회원가입을 완료하지 못하였습니다.";

      if (err.response && err.response.status === 400) {
        message = "필수값이 누락되어 회원가입을 완료하지 못하였습니다.";
      }

      setFaildJoin(true);
      setJoinFailMessage(message);
      setSubmit(false);
    }
  };

  const onToggleJoinFailAlert = () => {
    setFaildJoin(prevState => !prevState);
  };

  return (
    <JoinForm
      email={email}
      emailEl={emailEl}
      emailError={emailError}
      isFailedJoin={isFailedJoin}
      isSubmit={isSubmitting}
      joinFailMessage={joinFailMessage}
      password={password}
      passwordEl={passwordEl}
      password2={password2}
      password2El={password2El}
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
      userNameEl={userNameEl}
      userNameError={userNameError}
    />
  );
};

export default JoinContainer;
