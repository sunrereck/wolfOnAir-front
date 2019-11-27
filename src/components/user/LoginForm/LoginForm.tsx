import React from 'react'
import styled from 'styled-components';

import Button from '@/components/ui/Button';
import ValidationInput from "@/components/ui/ValidationInput";

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 440px;
  box-sizing: border-box;
`;

interface LoginFormProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
}

const LoginForm = () => {
  return (
    <>
      <h2>로그인</h2>
      <Form>
      <ValidationInput
          type="email"
          name="email"
          placeholder="이메일"
          // validations={[checkRequired, checkEmail]}
        />
        <ValidationInput
          type="password"
          name="password"
          placeholder="비밀번호"
          // validations={[checkRequired]}
        />
        <Button type="submit" size="medium" color="orange" variant="outline">
          로그인
        </Button>
      </Form>
    </>
  )
}

// LoginForm.defaultProps = {

// }

export default LoginForm
