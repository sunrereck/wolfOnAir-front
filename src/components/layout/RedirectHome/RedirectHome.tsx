import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules';

const RedirectHome = () => {
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));

  if (isLoggedIn) {
    return null;
  }

  return <Redirect to="/user/login" />
}

export default RedirectHome;