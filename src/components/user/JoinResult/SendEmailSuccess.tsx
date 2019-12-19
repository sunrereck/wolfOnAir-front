import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

const Wrapper = styled.section`
  text-align: center;

  p {
    margin: 1rem auto;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  button {
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
  }
`;

const SendEmailSuccess = () => {
  return (
    <>
    <Wrapper>
      <p>
      가입하신 이메일 주소<br/>
      <strong>kyoungah@kyoungah.com</strong>로 인증 메일을 보내드렸습니다.<br/>
      이메일 인증을 완료해주세요.
      <br/><br/>
      혹시 인증 메일을 못 받으셨나요?
      </p>
      <Button type="button">인증메일 재전송</Button>
    </Wrapper>
    </>
  )
}

export default SendEmailSuccess
