import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/modules';
import { removeUser } from '@/modules/user';

import Header from '@/components/layout/Header';

const HeaderContainer = () => {
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));
  const userName = useSelector((state: RootState) => (state.user.userName));
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(removeUser());
  }

  return (
    <Header 
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      userName={userName}
    />
  )
}

export default HeaderContainer;