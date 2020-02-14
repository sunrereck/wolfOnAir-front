import React, { useCallback, useState } from 'react';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { checkAvailabilityEmail, checkAvailabiltyUser, joinUser, sendAuthEmail } from '@/api/user';

import useForm from '@/hooks/useForm';
import useRequet from '@/hooks/useRequest';

import JoinForm from '@/components/user/JoinForm';

interface JoinContainerProps {
  history: History;
}

interface JoinFormState {
  email: string;
  password: string;
  password2: string;
  userName: string;
}

const JoinContainer: React.FC<JoinContainerProps> = ({ history }) => {
  // const [
  //   formState,
  //   isValid,
  //   isSubmit,
  //   onChange,
  //   onBlur,
  //   onSubmit,
  //   dispatch
  // ] = useForm(
  //   {
  //     email: '',
  //     password: '',
  //     password2: '',
  //     userName: ''
  //   },
  //   validate,
  //   asyncValidation
  // );
  // const [, onFetchJoinUser] = useRequet(onJoinUser, [], false); 
  // const [, onFetchSendEmail] = useRequet(onSendAuthEmail, [], false);
  // const [, onFetchJoinUser] = useRequet(onJoinUser, [], false);
  // const [, onFetchJoinUser] = useRequet(onJoinUser, [], false);

  // const onChangePassword = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (formState.values.password2) {
  //       dispatch({
  //         type: 'CHANGE_INPUT',
  //         name: 'password2',
  //         value: ''
  //       });
  
  //       dispatch({
  //         type: 'CHECK_ERROR',
  //         name: 'password2',
  //         value: ''
  //       });
  
  //     }

  //     onChange(e);
  //   },
  //   [dispatch, formState.values.password2, onChange]
  // );

  const onSubmit = async () => {
    const { email, password, userName } = formState.values;

    try {
      // await fetchData({
      //   email,
      //   password,
      //   userName
      // });

      // await onSendJoinEmail(email);

      history.push(`/user/join/${email}/send-email`);
    } catch(err) {
      // let errorMessage = "회원가입에 실패하였습니다.";

      // if (err.response && err.response.data) {
      //   const { reason } = err.response.data;

      //   errorMessage = reason;
      // }

      // setError(errorMessage);
      // handleToggleAlert();
    }
  }

  const onCloseAlert = () => {
    
  }
  
  return (
    <JoinForm
      email={formState.values.email}
      errorEmail={formState.errors.email || ''}
      errorPassword={formState.errors.password || ''}
      errorPassword2={formState.errors.password2 || ''}
      errorUserName={formState.errors.userName || ''}
      errorMessage={errorMessage}
      // isOpenAlert={isOpenAlert}
      isSubmit={isSubmit}
      isValid={isValid}
      password={formState.values.password}
      password2={formState.values.password2}
      userName={formState.values.userName}
      onBlur={onBlur}
      onChange={onChange}
      onChangePassword={onChangePassword}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {onSubmit(handleSubmit, e)}}
      onToggleAlert={handleToggleAlert}
    />
  );
};

export default JoinContainer;
