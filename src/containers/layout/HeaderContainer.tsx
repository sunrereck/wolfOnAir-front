import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules';

import Header from '@/components/layout/Header';

const HeaderContainer = () => {
  const isLoggedIn = useSelector((state: RootState) => (state.user.isLoggedIn));
  const userName = useSelector((state: RootState) => (state.user.userName));
  
  return (
    <Header 
      isLoggedIn={isLoggedIn}
      userName={userName}
    />
  )
}

export default HeaderContainer;