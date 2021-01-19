import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser } from '@/modules/user';

import useRequest from '@/hooks/useRequest';

import Header from '@/components/molecules/Header';

const HeaderContainer = () => {
  const history = useHistory();
  const {
    isLoggedIn,
    userName
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [,,,onLogout] = useRequest(logoutUser, null, true);

  const onClickLogout = () => {
    dispatch(removeUser());
    onLogout(null);

    history.push('/');
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