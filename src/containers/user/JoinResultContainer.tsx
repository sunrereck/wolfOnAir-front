import React, { useEffect, useState } from 'react';

import { sendEmail } from '@/api/user';

import JoinResult from '@/components/user/JoinResult';

interface JoinResultContainerProps {
  email: string;
}

async function sendAuthEmail(email: string) {
  await sendEmail(email);
}

const JoinResultContainer = ({ email }: JoinResultContainerProps): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
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
