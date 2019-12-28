import React, { useCallback, useEffect, useState } from 'react';

import { sendEmail } from '@/api/user';

import JoinResult from '@/components/user/JoinResult';

interface JoinResultContainerProps {
  email: string;
}

const JoinResultContainer = ({ email }: JoinResultContainerProps): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      try {
        await sendEmail(email);

        setSuccess(true);

      } catch(e) {
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [email]);

  return (
    <JoinResult 
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  )
}

export default JoinResultContainer;
