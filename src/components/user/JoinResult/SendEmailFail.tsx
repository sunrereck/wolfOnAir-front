import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

const Wrapper = styled.section`
  p {
    margin: 1rem auto;
    padding: 1rem;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 400px;

  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const SendEmailFail = () => {
  return (
    <Wrapper>
      <p>앗, 회원가입은 완료하였으나 이메일 전송은 실패하였습니다.</p>
      <ButtonWrapper>
        <Button type="button">인증 이메일 재전송</Button>
        <Button type="button" color="primaryOutline">관리자에게 문의하기</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default SendEmailFail
