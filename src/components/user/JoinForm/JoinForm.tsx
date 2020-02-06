import React from "react";
import styled from "styled-components";

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import ValidationInput from "@/components/ui/ValidationInput";
import UserTitle from '../UserTitle';

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 440px;
  box-sizing: border-box;

  .join-input {
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
  }
`;

interface JoinFormProps {
  email: string;
  errorEmail: string;
  errorPassword: string;
  errorPassword2: string;
  errorUserName: string;
  errorMessage: string;
  isOpenAlert: boolean;
  isSubmit: boolean;
  isValid: boolean;
  password: string;
  password2: string;
  userName: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  onToggleAlert: () => void;
}

const JoinForm = ({
  email,
  errorEmail,
  errorPassword,
  errorPassword2,
  errorUserName,
  errorMessage,
  isOpenAlert,
  isSubmit,
  isValid,
  password,
  password2,
  userName,
  onBlur,
  onChange,
  onChangePassword,
  onSubmit,
  onToggleAlert
}: JoinFormProps): JSX.Element => {

  return (
    <>
      <UserTitle>회원가입</UserTitle>
      <Form onSubmit={onSubmit}>
        <ValidationInput 
          className="join-input" 
          errorMessage={errorEmail}
          name="email"
          onBlur={onBlur} 
          onChange={onChange} 
          placeholder="이메일" 
          type="text"
          value={email}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={errorPassword}
          name="password"
          onBlur={onBlur} 
          onChange={onChangePassword} 
          placeholder="비밀번호" 
          type="password"
          value={password}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={errorPassword2}
          name="password2"
          onBlur={onBlur} 
          onChange={onChange} 
          placeholder="비밀번호 재입력" 
          type="password"
          value={password2}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={errorUserName}
          name="userName"
          onBlur={onBlur} 
          onChange={onChange} 
          placeholder="닉네임" 
          type="text"
          value={userName}
        />
        <Button type="submit" disabled={!isValid || isSubmit}>{isSubmit ? '회원가입 중...' : '회원가입'}</Button>
      </Form>
      <Alert
        isOpen={isOpenAlert}
        onClick={onToggleAlert}
        onClose={onToggleAlert}
      >
        {errorMessage}
      </Alert>
    </>
  );
};

export default JoinForm;
