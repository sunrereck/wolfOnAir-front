import React, { useCallback, useState } from 'react';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { checkEmail, checkUserName, joinUser, sendEmail } from '@/api/user';

import useForm from '@/hooks/useForm';
import useRequet from '@/hooks/useRequest';

import JoinForm from '@/components/user/JoinForm';

interface FormState {
  email: string;
  password: string;
  password2: string;
  userName: string;
}

function validateEmail(value: string) {
  if (value === '') {
    return '필수 정보입니다.';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value)) {
    return '이메일 형식이 아닙니다.';
  }

  return '';
}

function validatePassword(value: string) {
  if (value === '') {
    return '필수 정보입니다.';
  }

  if (value.length < 8 || value.length > 16) {
    return '비밀번호는 최소 8글자 이상 최대 16글자 이하이어야 합니다.';
  }

  if (
    !value.match(/^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  ) {
    return '비밀번호는 숫자, 영문자, 특수문자를 포함해야합니다.';
  }

  return '';
}

function validatePassword2(value: string, password: string) {
  if (value === '') {
    return '필수 정보입니다.';
  }

  if (value !== password) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return '';
}

function validateUserName(value: string) {
  if (value === '') {
    return '필수 정보입니다.';
  }

  if (value.length < 2 || value.length > 8) {
    return '닉네임은 2글자 이상 8글자 이하여야 합니다.';
  }

  return '';
}

function validate (name: string, value: string, state: FormState) {
  if (name === 'email') {
    const error = validateEmail(value);

    return error;
  }

  if (name === 'password') {
    return validatePassword(value);
  }

  if (name === 'password2') {
    return validatePassword2(value, state.password);
  }

  if (name === 'userName') {
    const error = validateUserName(value);

    return error;
  }

  return '';
};

async function asyncValidation (name: string, value: string, state: FormState) {
  let error = '';

  if (name === 'email') {
    try {
      const response: AxiosResponse = await checkEmail(value);
  
      if (!response.data.isOk) {
        error = '이미 사용하고 있는 이메일 입니다.';
      }
    } catch (e) {
      error = '통신 에러';
    }
  }

  if (name === 'userName') {
    try {
      const response = await checkUserName(value);
  
      if (!response.data.isOk) {
        error = '이미 사용하고 있는 이메일 입니다.';
      }
    } catch (e) {
      error = '통신 에러';
    }
  }

  return error;
}

interface JoinContainerProps {
  history: History;
}

const JoinContainer: React.FC<JoinContainerProps> = ({ history }) => {
  const [isOpenAlert, setAlert] = useState(false);
  const [state] = useRequet(, [], false);
  const [
    formState,
    isValid,
    isSubmit,
    onChange,
    onBlur,
    onSubmit,
    dispatch
  ] = useForm(
    {
      email: '',
      password: '',
      password2: '',
      userName: ''
    },
    validate,
    asyncValidation
  );

  const onChagePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'CHANGE_INPUT',
        name: 'password2',
        value: ''
      });

      dispatch({
        type: 'CHECK_ERROR',
        name: 'password2',
        value: ''
      });

      onChange(e);
    },
    [dispatch, onChange]
  );

  const onClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isValid || isSubmit) {
    //   return;
    // }


    try {
      onSubmit();
    } catch(e) {
      handleToggleAlert();
    }
  };

  const handleToggleAlert = () => {
    setAlert(prevState => !prevState);
  }

  return (
    <JoinForm
      email={formState.values.email}
      errorEmail={formState.errors.email || ''}
      errorPassword={formState.errors.password || ''}
      errorPassword2={formState.errors.password2 || ''}
      errorUserName={formState.errors.userName || ''}
      isOpenAlert={isOpenAlert}
      isSubmit={isSubmit}
      isValid={isValid}
      password={formState.values.password}
      password2={formState.values.password2}
      userName={formState.values.userName}
      onBlur={onBlur}
      onChange={onChange}
      onChangePassword={onChagePassword}
      onSubmit={onClick}
      onToggleAlert={handleToggleAlert}
    />
  );
};

export default JoinContainer;
