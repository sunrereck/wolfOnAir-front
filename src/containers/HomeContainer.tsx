import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { RootState } from "@/modules";

import Home from "@/components/molecules/home/Home";

const HomeContainer = (): React.ReactElement => {
  const history = useHistory();
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const onRedirectLobby = () => {
    if (isLoggedIn) {
      history.push('/lobby');

      return;
    }

    history.push('/user/login?redirect=/lobby');
  }

  return (
    <Home onRedirectLobby={onRedirectLobby} />
  );
};

export default HomeContainer;
