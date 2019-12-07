import React from 'react';

import UserTitle from '../UserTitle';

const JoinSuccess = () => {
  return (
    <>
      <UserTitle>회원가입 완료</UserTitle>
      <div>
        회원가입이 완료되었습니다.<br/>
        인증을 위헤 이메일이 전송되었습니다.
      </div>
    </>
  )
}

export default JoinSuccess
