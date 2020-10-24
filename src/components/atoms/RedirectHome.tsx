import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules';

interface RedirectHomeProps {
  isCheckingAuth: boolean;
}

function RedirectHome ({
  isCheckingAuth
}: RedirectHomeProps): React.ReactElement {
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));

  if (isCheckingAuth) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }
  
  return <Redirect to="/user/login" />
}

export default RedirectHome;