import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

const Title = styled.h2`
  margin: 2rem auto 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
`;

const Wrapper = styled.form`
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

const EmailAuthSuccess = () => {
  return (
    <>
    <Title>
      이메일 인증 완료
    </Title>
    <Wrapper>
      <p>
        <strong>test@test.com</strong>
        <br/>
        이메일 인증이 완료 되었습니다!
      </p>
      <Button type="button" variant="contained">로그인 하러 가기</Button>
    </Wrapper>
    </>
  )
}

export default EmailAuthSuccess;
