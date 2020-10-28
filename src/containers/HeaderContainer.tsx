import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser } from '@/modules/user';

import useRequest from '@/hooks/useRequest';

import Header from '@/components/molecules/Header';

const HeaderContainer = () => {
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));
  const userName = useSelector((state: RootState) => (state.user.userName));
  const dispatch = useDispatch();
  const [, onLogout] = useRequest(logout, [], true);

  const onClickLogout = () => {
    onLogout();
    dispatch(removeUser());

    // window.location.href= "/";
  }

  return (
    <Header 
      isLoggedIn={isLoggedIn}
      onLogout={onClickLogout}
      userName={userName}
    />
  )
}

export default HeaderContainer;