import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules';

function RedirectHome (): React.ReactElement | null {
  const {
    isLoading,
    isLoggedIn
  } = useSelector((state: RootState) => (state.user));

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }
  
  return <Redirect to="/user/login" />
}

export default RedirectHome;