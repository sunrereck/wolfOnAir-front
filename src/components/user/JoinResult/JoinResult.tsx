import React from 'react';

import PageLoader from '@/components/ui/PageLoader';

import UserTitle from '../UserTitle';

import SendEmailFail from './SendEmailFail';
import SendEmailSuccess from './SendEmailSuccess';

interface JoinResultProps {
  isLoading: boolean;
  isSuccess: boolean;
  onSendAuthMail: () => void;
  onSendHelpMail: () => void;
}

const JoinResult = ({
  isLoading,
  isSuccess,
  onSendAuthMail,
  onSendHelpMail
}: JoinResultProps): JSX.Element => {

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <UserTitle>회원가입 완료</UserTitle>
      <div>
        {
          isSuccess ? <SendEmailSuccess /> : <SendEmailFail onSendAuthMail={onSendAuthMail} onSendHelpMail={onSendHelpMail}/>
        }
      </div>
    </>
  )
}

export default JoinResult;
