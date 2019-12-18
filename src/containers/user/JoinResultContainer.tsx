import React, { useEffect, useState } from 'react';

import { sendEmail } from '@/api/user';

import JoinResult from '@/components/user/JoinResult';

const JoinResultContainer = () => {
  const [isLoading, setLoading ] = useState(false);
  const [isSuccess, setSuccess ] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <JoinResult 
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  )
}

export default JoinResultContainer;
