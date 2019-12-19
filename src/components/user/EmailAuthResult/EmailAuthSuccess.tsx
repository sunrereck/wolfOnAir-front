import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';
import UserTitle from '../UserTitle';

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

const EmailAuthSuccess = () => {
  return (
    <>
    <UserTitle>
      이메일 인증 완료
    </UserTitle>
    <Wrapper>
      <p>
        <strong>test@test.com</strong>
        <br/>
        이메일 인증이 완료 되었습니다!
      </p>
      <Button type="button" color="primaryOutline">로그인</Button>
    </Wrapper>
    </>
  )
}

export default EmailAuthSuccess;
