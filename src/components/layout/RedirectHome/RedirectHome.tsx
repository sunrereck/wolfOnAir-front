import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules';

const RedirectHome = () => {
  const isLoaded = useSelector((state: RootState) => (state.user.isLoggedIn));
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));

  if (!isLoaded) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }
  

  return <Redirect to="/user/login" />
}

export default RedirectHome;