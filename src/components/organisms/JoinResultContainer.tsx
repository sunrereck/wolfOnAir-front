import React, { useState } from 'react';

import { sendAuthEmail } from '@/api/user';
import { sendJoinAuthHelpEmail } from '@/api/help';

import JoinResult from '@/components/molecules/JoinResult';

interface JoinResultContainerProps {
  email: string;
}

const JoinResultContainer = ({ email }: JoinResultContainerProps): JSX.Element => {
  const [isAuthMailLoading, setAuthMailLoading] = useState(false);
  const [isHelpMailLoading, setHelpEmailLoading] = useState(false);

  const handleSendEmail = async () => {
    setAuthMailLoading(true);

    try {
      await sendAuthEmail(email);

    } catch(e) {
//
    }

    setAuthMailLoading(false);
  }

  const handleSendHelpEmail = async () => {
    setHelpEmailLoading(true);

    try {
      await sendJoinAuthHelpEmail(email);
    } catch(e) {

    }

    setHelpEmailLoading(false);
  }

  return (
    <JoinResult 
      email={email}
      isAuthMailLoading={isAuthMailLoading}
      isHelpMailLoading={isHelpMailLoading}
      onSendAuthMail={handleSendEmail}
      onSendHelpMail={handleSendHelpEmail}
    />
  )
}

export default JoinResultContainer;
