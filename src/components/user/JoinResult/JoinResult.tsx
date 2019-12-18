import React from 'react';

import PageLoader from '@/components/ui/PageLoader';

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
    <div>
      {
        isSuccess ? '인증메일을 전송하였습니다.' : '인증메일 전송에 실패하였습니다.'
      }
    </div>
  )
}

export default JoinResult;
