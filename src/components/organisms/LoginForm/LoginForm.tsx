import React, { useCallback } from "react";
import styled from "styled-components";

import useForm from '@/hooks/useForm';

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import ValidationInput from "@/components/molecules/ValidationInput";
import Alert from '@/components/molecules/Alert';

interface ValidateLoginParams {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  email: string;
  password: string;
}

function validate(values: ValidateLoginParams): ValidateLoginParams {
  const errors = {} as ValidateLoginParams;

  if (!values.email) {
    errors.email = "필수 항목 입니다";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
    errors.email = "이메일 형식이 아닙니다";
  }

  if (!values.password) {
    errors.password = '필수 항목 입니다'
  }

  return errors;
}

function LoginForm({
  email,
  password
}: LoginFormProps): React.ReactElement {
  const [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef
  ] = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    // @ts-ignore
    validate
  });

  return (
    <Wrapper>
      <h2>로그인</h2>
      <Form onSubmit={onSubmit(() => {console.log(123)})}>
        <ValidationInput 
          name="email"
          placeholder="이메일" 
          errorMessage={errors.email}
          value={values.email || ''}
          onChange={onChange}
          onBlur={onBlur}
          inputEl={onRef}
          />
        <ValidationInput 
          name="password"
          placeholder="패스워드" 
          errorMessage={errors.password}          
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          inputEl={onRef}
          />
          <Button type="submit">
            로그인
          </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 2rem;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    text-align: center;
  }

  form {
    margin: 0 auto;
  }

  input {
    margin-bottom: 0.5rem;
  }

  button {
    width: 100%;
  }
`;

export default LoginForm;
