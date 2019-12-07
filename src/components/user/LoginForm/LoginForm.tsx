import React from "react";
import styled from "styled-components";

import Button from "@/components/ui/Button";
import LinkButton from '@/components/ui/LinkButton';
import ValidationInput from "@/components/ui/ValidationInput";
import UserTitle from '../UserTitle';

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 440px;
  box-sizing: border-box;
  
  .login-input {
    margin-bottom: 1rem;
  }

  button,
  a {
    width: 100%;
    text-align: center;
  }

  button {
    margin-bottom: 1rem;
  }
`;

interface LoginFormProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
}

const LoginForm = () => {
  return (
    <>
      <UserTitle>로그인</UserTitle>
      <Form>
        <ValidationInput
          className="login-input"
          type="email"
          name="email"
          placeholder="이메일"
          // validations={[checkRequired, checkEmail]}
        />
        <ValidationInput
          className="login-input"
          type="password"
          name="password"
          placeholder="비밀번호"
          // validations={[checkRequired]}
        />
        <Button type="submit" size="medium" color="primary">
          로그인
        </Button>
        <LinkButton color="primaryOutline" to="/user/join">회원가입</LinkButton>
      </Form>
    </>
  );
};

// LoginForm.defaultProps = {

// }

export default LoginForm;
