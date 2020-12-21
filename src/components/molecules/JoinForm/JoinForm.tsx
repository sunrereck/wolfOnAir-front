import React from "react";
import styled from "styled-components";

import Alert from "@/components/molecules/Alert";
import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import ValidationInput from "@/components/molecules/ValidationInput";
import UserTitle from "../UserTitle";

interface JoinFormProps {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  password2: string;
  password2Error: string;
  userName: string;
  userNameError: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRef: (ref: any) => void;
  onSubmit: any;
}

function JoinForm({
  email,
  emailError,
  password,
  passwordError,
  password2,
  password2Error,
  userName,
  userNameError,
  onBlur,
  onChange,
  onRef,
  onSubmit
}: JoinFormProps): React.ReactElement {
  return (
    <>
      <UserTitle>회원가입</UserTitle>
      <Wrapper onSubmit={onSubmit}>
        <ValidationInput
          errorMessage={emailError}
          inputEl={onRef}
          name="email"
          onBlur={onBlur}
          onChange={onChange}
          placeholder="이메일"
          type="text"
          value={email}
        />
        <ValidationInput
          errorMessage={passwordError}
          inputEl={onRef}
          name="password"
          onBlur={onBlur}
          onChange={onChange}
          placeholder="비밀번호"
          type="password"
          value={password}
        />
        <ValidationInput
          errorMessage={password2Error}
          inputEl={onRef}
          name="password2"
          onBlur={onBlur}
          onChange={onChange}
          placeholder="비밀번호 재입력"
          type="password"
          value={password2}
        />
        <ValidationInput
          errorMessage={userNameError}
          inputEl={onRef}
          name="userName"
          onBlur={onBlur}
          onChange={onChange}
          placeholder="닉네임"
          type="text"
          value={userName}
        />
        <Button
          type="submit"
          onMouseDown={(e: any) => e.preventDefault()}
        >
          회원가입
        </Button>
      </Wrapper>
      {/* <Alert
        isShown={isFailedJoin}
        title="123"
        onClick={onToggleJoinFailAlert}
        onClose={onToggleJoinFailAlert}
      >
        {joinFailMessage}
      </Alert> */}
    </>
  );
}

const Wrapper = styled(Form)`
  padding: 1rem;


  button {
    width: 100%; 
  }

  > div {
    margin-bottom: 1rem;
  }
`;

export default JoinForm;
