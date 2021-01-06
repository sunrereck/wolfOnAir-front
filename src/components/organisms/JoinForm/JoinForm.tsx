import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import Heading from '@/components/atoms/Heading';
import Alert from "@/components/molecules/Alert";
import ValidationInput from "@/components/molecules/ValidationInput";

interface JoinFormProps {
  alertMessage: string;
  email: string;
  emailError: string;
  isShownAlert: boolean;
  isSubmitting: boolean;
  password: string;
  passwordError: string;
  password2: string;
  password2Error: string;
  userName: string;
  userNameError: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseAlert: () => void;
  onRef: (ref: any) => void;
  onSubmit: any;
}

function JoinForm({
  alertMessage,
  email,
  emailError,
  isShownAlert,
  isSubmitting,
  password,
  passwordError,
  password2,
  password2Error,
  userName,
  userNameError,
  onBlur,
  onChange,
  onCloseAlert,
  onRef,
  onSubmit
}: JoinFormProps): React.ReactElement {
  return (
    <>
      <StyledHeading>회원가입</StyledHeading>
      <StyledForm onSubmit={onSubmit}>
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
          disabled={isSubmitting}
        >
          회원가입
        </Button>
      </StyledForm>    
      <Alert
        isShown={isShownAlert}
        title="회원가입 실패"
        onClick={onCloseAlert}
        onClose={onCloseAlert}
      >
        {alertMessage}
      </Alert>
    </>
  );
}

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
  font-size: 1.25rem;
  text-align: center;
`;

const StyledForm = styled(Form)`
  button {
    width: 100%; 
  }

  > div {
    margin-bottom: 1rem;
  }
`;

export default JoinForm;
