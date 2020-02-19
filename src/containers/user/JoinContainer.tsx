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

const JoinContainer = ({ history }: JoinContainerProps): JSX.Element => {
  const [errorMessage, setError] = useState('');
  const [isOpenedAlert, setAlert] = useState(false); 
  const [isSubmitting, setSubmit] = useState(false);
  const [email, emailError,,, onChangeEmail] = useValidationInput('');
  const [password, passwordError,,, onChangePassword] = useValidationInput('');
  const [password2, password2Error,,, onChangePassword2] = useValidationInput('');
  const [userName, userNameError,,, onChangeUserName] = useValidationInput('');
  const [, onJoinUser] = useRequet(joinUser, [], false);
  const [, onSendAuthEmail] = useRequet(sendAuthEmail, [], false);

  const onSubmitJoinForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
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

      setAlert(true);
      setError(message);
      setSubmit(false);
    }
  };

  const onToggleAlert = () => {
    setAlert(prevState => !prevState);
  }

  return (
    <JoinForm
      email={email}
      emailError={emailError}
      errorMessage={errorMessage}
      isOpenAlert={isOpenedAlert}
      isSubmit={isSubmitting}
      isValid={isValid}
      password={password}
      password2={password2}
      userName={userName}
      onBlur={onBlur}
      onChange={onChange}
      onChangePassword={onChangePassword}
      onSubmit={onSubmitJoinForm}
      onToggleAlert={onToggleAlert}
      passwordError={passwordError}
      password2Error={password2Error}
      userNameError={userNameError}
    />
  );
};

export default JoinContainer;
