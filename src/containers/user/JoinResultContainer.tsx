import React, { useEffect, useState } from 'react';

import { sendEmail } from '@/api/user';
import { sendJoinAuthHelpEmail } from '@/api/help';

import JoinResult from '@/components/user/JoinResult';

interface JoinResultContainerProps {
  email: string;
}

const JoinResultContainer = ({ email }: JoinResultContainerProps): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const handleSendEmail = async () => {
    try {
      await sendEmail(email);

    } catch(e) {
//
    }
  }

  const handleSendHelpEmail = async () => {
    try {
      await sendJoinAuthHelpEmail(email);
    } catch(e) {

    }
  }

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
      onSendAuthMail={handleSendEmail}
      onSendHelpMail={handleSendHelpEmail}
    />
  )
}

export default JoinResultContainer;
