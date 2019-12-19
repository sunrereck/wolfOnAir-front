import React from 'react';
import styled from 'styled-components';

import LinkButton from '@/components/ui/LinkButton';

const Wrapper = styled.section`
  text-align: center;

  p {
    margin: 1rem auto;
    padding: 1rem;
    line-height: 1.3;
  }

  a {
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
  }
`;

const SendEmailSuccess = () => {
  return (
    <Wrapper>
      <p>거의 다 됐습니다!<br/>인증 링크를 이메일로 전송하였습니다.<br/>인증을 마무리 해주세요.</p>
      <LinkButton to="/user/login">로그인</LinkButton>
    </Wrapper>
  )
}

export default SendEmailSuccess
