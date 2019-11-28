import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@/components/ui/Button";
import ValidationInput from "@/components/ui/ValidationInput";

const Title = styled.h2`
  margin: 2rem auto 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
`;

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

  a {
    display: block;

    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid ${({ theme }) => theme.primaryColor};
    border-radius: 5px;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.primaryColor};
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
      <Title>로그인</Title>
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
        <Button type="submit" size="medium" color="primary" variant="contained">
          로그인
        </Button>
        <Link to="/user/join">회원가입</Link>
      </Form>
    </>
  );
};

// LoginForm.defaultProps = {

// }

export default LoginForm;
