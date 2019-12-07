import React from "react";
import styled from "styled-components";

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
  isSubmit: boolean;
  isValid: boolean;
  password: string;
  password2: string;
  userName: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JoinForm = (): JSX.Element => {
  return (
    <>
      <UserTitle>회원가입</UserTitle>
      <Form>
        <ValidationInput className="join-input" placeholder="이메일" />
        <ValidationInput className="join-input" placeholder="비밀번호" />
        <ValidationInput className="join-input"placeholder="비밀번호 재입력" />
        <ValidationInput className="join-input" placeholder="닉네임" />
        <Button type="submit">가입하기</Button>
      </Form>
    </>
  );
};

export default JoinForm;
