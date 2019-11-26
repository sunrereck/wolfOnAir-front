import React from "react";
import styled from "styled-components";

import Button from '@/components/ui/Button';
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
  max-width: 440px;

  .join-input {
    margin-bottom: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  button {
    width: 50%;
  }
`;

const JoinForm = (): JSX.Element => {
  return (
    <>
      <Title>회원가입</Title>
      <Form>
        <ValidationInput className="join-input" placeholder="이메일" />
        <ValidationInput className="join-input" placeholder="비밀번호" />
        <ValidationInput className="join-input"placeholder="비밀번호 재입력" />
        <ValidationInput className="join-input" placeholder="닉네임" />
        <ButtonWrapper>
          <Button type="button" variant="outline">취소</Button>
          <Button type="submit">가입</Button>
        </ButtonWrapper>
      </Form>
    </>
  );
};

export default JoinForm;
