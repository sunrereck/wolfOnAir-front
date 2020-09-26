import React from "react";
import { useSelector } from "react-redux";
import { History } from "history";

import { RootState } from "@/modules";

import Home from "@/components/molecules/home/Home";

interface HomeContainerProps {
  history: History
}

const HomeContainer = ({
  history
}: HomeContainerProps) => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.user.isLoggedIn
    })
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
