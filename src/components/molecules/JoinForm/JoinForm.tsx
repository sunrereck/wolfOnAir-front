import React from "react";
import styled from "styled-components";

import Alert from "@/components/molecules/Alert";
import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import ValidationInput from "@/components/molecules/ValidationInput";
import UserTitle from "../UserTitle";

interface JoinFormProps {
  email: string;
  emailEl: React.RefObject<HTMLInputElement>;
  emailError: string;
  isFailedJoin: boolean;
  isSubmit: boolean;
  joinFailMessage: string;
  password: string;
  passwordEl: React.RefObject<HTMLInputElement>;
  password2: string;
  password2El: React.RefObject<HTMLInputElement>;
  userName: string;
  userNameEl: React.RefObject<HTMLInputElement>;
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
  emailEl,
  emailError,
  isFailedJoin,
  isSubmit,
  joinFailMessage,
  password,
  passwordEl,
  password2,
  password2El,
  userName,
  userNameEl,
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
  userNameError
}: JoinFormProps): React.ReactElement => {
  const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <UserTitle>회원가입</UserTitle>
      <Form onSubmit={onSubmit}>
        <ValidationInput
          errorMessage={emailError}
          inputEl={emailEl}
          name="email"
          onBlur={onBlurEmail}
          onChange={onChangeEmail}
          placeholder="이메일"
          type="text"
          value={email}
        />
        <ValidationInput
          errorMessage={passwordError}
          inputEl={passwordEl}
          name="password"
          onBlur={onBlurPassword}
          onChange={onChangePassword}
          placeholder="비밀번호"
          type="password"
          value={password}
        />
        <ValidationInput
          errorMessage={password2Error}
          inputEl={password2El}
          name="password2"
          onBlur={onBlurPassword2}
          onChange={onChangePassword2}
          placeholder="비밀번호 재입력"
          type="password"
          value={password2}
        />
        <ValidationInput
          errorMessage={userNameError}
          inputEl={userNameEl}
          name="userName"
          onBlur={onBlurUserName}
          onChange={onChangeUserName}
          placeholder="닉네임"
          type="text"
          value={userName}
        />
        <Button
          type="submit"
          onMouseDown={onIgnoreBlurEvent}
          disabled={isSubmit}
        >
          {isSubmit ? "회원가입 중..." : "회원가입"}
        </Button>
      </Form>
      <Alert
        isShown={isFailedJoin}
        title="123"
        onClick={onToggleJoinFailAlert}
        onClose={onToggleJoinFailAlert}
      >
        {joinFailMessage}
      </Alert>
    </>
  );
};

export default JoinForm;
