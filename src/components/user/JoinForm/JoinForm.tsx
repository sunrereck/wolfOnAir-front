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
  emailError: string;
  isFailedJoin: boolean;
  isSubmit: boolean;
  isValid: boolean;
  joinFailMessage: string;
  password: string;
  password2: string;
  userName: string;
  onBlurEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  onToggleJoinFailAlert: () => void;
  passwordError: string;
  password2Error: string;
  userNameError: string;
}

const JoinForm = ({
  email,
  emailError,
  isFailedJoin,
  isSubmit,
  isValid,
  joinFailMessage,
  password,
  password2,
  userName,
  onBlurEmail,
  onBlurPassword,
  onBlurPassword2,
  onBlurUserName,
  onChangeEmail,
  onChangePassword,
  onChangePassword2,
  onChangeUserName,
  onSubmit,
  onToggleJoinFailAlert,
  passwordError,
  password2Error,
  userNameError,
}: JoinFormProps): JSX.Element => {

  return (
    <>
      <UserTitle>회원가입</UserTitle>
      <Form onSubmit={onSubmit}>
        <ValidationInput 
          className="join-input" 
          errorMessage={emailError}
          name="email"
          onBlur={onBlurEmail} 
          onChange={onChangeEmail} 
          placeholder="이메일" 
          type="text"
          value={email}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={passwordError}
          name="password"
          onBlur={onBlurPassword} 
          onChange={onChangePassword} 
          placeholder="비밀번호" 
          type="password"
          value={password}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={password2Error}
          name="password2"
          onBlur={onBlurPassword2} 
          onChange={onChangePassword2} 
          placeholder="비밀번호 재입력" 
          type="password"
          value={password2}
        />
        <ValidationInput 
          className="join-input" 
          errorMessage={userNameError}
          name="userName"
          onBlur={onBlurUserName} 
          onChange={onChangeUserName} 
          placeholder="닉네임" 
          type="text"
          value={userName}
        />
        <Button type="submit" disabled={!isValid || isSubmit}>{isSubmit ? '회원가입 중...' : '회원가입'}</Button>
      </Form>
      <Alert
        isShown={isFailedJoin}
        onClick={onToggleJoinFailAlert}
        onClose={onToggleJoinFailAlert}
      >
        {joinFailMessage}
      </Alert>
    </>
  );
};

export default JoinForm;
