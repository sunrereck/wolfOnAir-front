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


async function validateEmail() {}

function validatePassword() {}

function validatePassword2() {}

async function validateUserName() {}

const JoinContainer = ({ history }: JoinContainerProps): JSX.Element => {
  const [errorMessage, setError] = useState('');
  const [isFailedJoin, setJoinResult] = useState(false); 
  const [isSubmitting, setSubmit] = useState(false);
  const [email, emailError,,, onChangeEmail] = useValidationInput('', validateEmail);
  const [password, passwordError,,, onChangePassword] = useValidationInput('', validatePassword);
  const [password2, password2Error,,, onChangePassword2] = useValidationInput('', validatePassword2);
  const [userName, userNameError,,, onChangeUserName] = useValidationInput('', validateUserName);
  const [, onJoinUser] = useRequet(joinUser, [], false);
  const [, onSendAuthEmail] = useRequet(sendAuthEmail, [], false);

  const onSubmitJoinForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      setJoinResult(true);
      setError(message);
      setJoinResult(false);
    }
  };

  const onToggleJoinFailAlert = () => {
    setJoinResult(prevState => !prevState);
  }

  return (
    <JoinForm
      email={email}
      emailError={emailError}
      isFailedJoin={isFailedJoin}
      isSubmit={isSubmitting}
      isValid
      joinFailMessage={errorMessage}
      password={password}
      password2={password2}
      userName={userName}
      onBlur={() => {}}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
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
