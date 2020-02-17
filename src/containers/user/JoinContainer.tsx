import React, { useState } from "react";
import { History } from "history";
import {
  checkAvailabilityEmail,
  checkAvailabiltyUser,
  joinUser,
  sendAuthEmail
} from "@/api/user";

import useForm from "@/hooks/useInputs";
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
  const [, onJoinUser] = useRequet(joinUser, [], false);
  const [, onSendAuthEmail] = useRequet(sendAuthEmail, [], false);
  const [
    formState,
    isValid,
    onChange,
    onBlur,
    dispatch
  ] = useForm(
    {
      email: "",
      password: "",
      password2: "",
      userName: ""
    }
  );

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formState.values.password2) {
      dispatch({
        type: "CHANGE_INPUT",
        name: "password2",
        value: ""
      });

      dispatch({
        type: "CHECK_ERROR",
        name: "password2",
        value: ""
      });
    }

    onChange(e);
  };

  const onSubmitJoinForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, userName } = formState.values;

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
      email={formState.values.email}
      errorEmail={formState.errors.email || ""}
      errorPassword={formState.errors.password || ""}
      errorPassword2={formState.errors.password2 || ""}
      errorUserName={formState.errors.userName || ""}
      errorMessage={errorMessage}
      isOpenAlert={isOpenedAlert}
      isSubmit={isSubmitting}
      isValid={isValid}
      password={formState.values.password}
      password2={formState.values.password2}
      userName={formState.values.userName}
      onBlur={onBlur}
      onChange={onChange}
      onChangePassword={onChangePassword}
      onSubmit={onSubmitJoinForm}
      onToggleAlert={onToggleAlert}
    />
  );
};

export default JoinContainer;
