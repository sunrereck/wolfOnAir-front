import React from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Heading from "@/components/atoms/Heading";

const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: 440px;
  text-align: center;

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  strong {
    font-size: 1.25rem;
  }

  button {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

interface EmailAuthSuccessProps {
  email: string
}

const EmailAuthSuccess = ({email}: EmailAuthSuccessProps): JSX.Element => {
  return (
    <>
    <Heading>
      이메일 인증 완료
    </Heading>
    <Wrapper>
      <p>
        <strong>{email}</strong>
        <br/>
        이메일 인증이 완료 되었습니다!
      </p>
      <Button variant="outlined" to="/user/login">로그인하러 가기</Button>
    </Wrapper>
    </>
  )
}

export default EmailAuthSuccess;
