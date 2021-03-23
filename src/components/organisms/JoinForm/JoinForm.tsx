import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import Alert from "@/components/molecules/Alert";
import JoinWrapper from '@/components/molecules/JoinWrapper';
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
  onSubmit: () => void;
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
    <JoinWrapper title="회원가입">
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
          color="primary"
          variant="contained"
          width="100%"
          height="3rem"
          disabled={isSubmitting}
          onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}>
          회원가입
        </Button>
      </StyledForm>    
    </JoinWrapper>
      <Alert
        isShowing={isShownAlert}
        title="회원가입 실패"
        onClick={onCloseAlert}
        onClose={onCloseAlert}
      >
        {alertMessage}
      </Alert>
    </>
  );
}

const StyledForm = styled(Form)`
  button {
    width: 100%; 
  }

  > div {
    margin-bottom: 1rem;
  }
`;

export default JoinForm;
