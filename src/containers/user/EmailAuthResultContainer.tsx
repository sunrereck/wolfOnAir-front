import React, { useEffect } from 'react';

import useRequet from '@/hooks/useRequest';

import EmailAuthResult from '@/components/user/EmailAuthResult';
import { updateUserAuth } from '@/api/user';

interface Props {
  email: string;
}

async function onUpdateUserAuth(email: string) {
  try {
    const response = await updateUserAuth(email);

    return response.data;
  } catch (e) {
    throw new Error('error!');
  }
};

const EmailAuthResultContainer = ({email}: Props): JSX.Element => {
  const [state] = useRequet(() => onUpdateUserAuth(email), [], true);

  useEffect(() => {}, []);

  return <EmailAuthResult isFail={state.error} />  
}

export default EmailAuthResultContainer;