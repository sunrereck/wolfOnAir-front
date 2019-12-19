import React from 'react';

import PageLoader from '@/components/ui/PageLoader';

import UserTitle from '../UserTitle';

import SendEmailFail from './SendEmailFail';
import SendEmailSuccess from './SendEmailSuccess';

interface JoinResultProps {
  isLoading: boolean;
  isSuccess: boolean;
}

const JoinResult = ({
  isLoading,
  isSuccess
}: JoinResultProps): JSX.Element => {

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <UserTitle>회원가입 완료</UserTitle>
      <div>
        {
          true ? <SendEmailSuccess /> : <SendEmailFail />
        }
      </div>
    </>
  )
}

export default JoinResult;
