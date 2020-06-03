import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/modules";

interface RedirectHomeProps {
  isAuthLoading: boolean;
}

const RedirectHome = ({ isAuthLoading }: RedirectHomeProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useSelector(
    (state: any) => state.user.isLoggedIn,
    (state: RootState, prevState: RootState) => {
      return state.user.isLoggedIn !== prevState.user.isLoggedIn;
    }
  );

  console.log(isAuthLoading, user);

  if (isAuthLoading) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }

  return <Redirect to="/user/login" />;
};

export default RedirectHome;
