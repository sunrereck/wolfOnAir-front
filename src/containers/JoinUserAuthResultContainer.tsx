import React from "react";
import { useLocation, useParams } from 'react-router-dom';

import { updateUserAuth } from "@/api/user";

import { getUrlQuery } from '@/utils/commons';

import useRequet from "@/hooks/useRequest";

import JoinUserAuthResult from "@/components/organisms/JoinUserAuthResult";

function JoinUserAuthResultContainer(): React.ReactElement {
  const { email }: { email: string} = useParams();
  const location = useLocation();
  const query = getUrlQuery(location.search);
  const [
    updateJoinUserAuthDate,
    updateJoinUserAuthError,
    isLoadingJoinUserLoading
  ] = useRequet(updateUserAuth, {
    email,
    code: query?.code as string || ''
  });

  return (
    <JoinUserAuthResult
      updateJoinUserAuthDate={updateJoinUserAuthDate}
      updateJoinUserAuthError={updateJoinUserAuthError}
      isLoadingJoinUserLoading={isLoadingJoinUserLoading}
    />
  );
};

export default JoinUserAuthResultContainer;
