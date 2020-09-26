import React from 'react';
import styled from 'styled-components';

import EmailAuthFail from './EmailAuthFail'
import EmailAuthSuccess from './EmailAuthSuccess';

const Loader = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: 440px;
  text-align: center;

  p {
    margin-top: 3rem;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

interface EmailAuthResultProps {
  email: string;
  error: any;
  isFail: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const EmailAuthResult = ({
  email,
  error,
  isFail,
  isLoading,
  isSuccess
}: EmailAuthResultProps): JSX.Element | null => {
  if (isLoading) {
    return <Loader><p>이메일 인증 중...</p></Loader>
  }

  if (isFail) {
    return <EmailAuthFail error={error}/>
  }

  if (isSuccess) {
    return <EmailAuthSuccess email={email}/>
  }

  return null;
}

export default EmailAuthResult;
