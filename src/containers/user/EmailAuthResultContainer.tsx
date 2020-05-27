import React from "react";

import useRequet from "@/hooks/useRequest";

import EmailAuthResult from "@/components/user/EmailAuthResult";
import { updateUserAuth } from "@/api/user";

interface EmailAuthResultContainerProps {
  email: string;
}

const EmailAuthResultContainer = ({
  email
}: EmailAuthResultContainerProps): JSX.Element => {
  const [state] = useRequet(() => updateUserAuth(email), [], false);

  return (
    <EmailAuthResult
      email={email}
      error={state.error}
      isFail={!!state.error}
      isLoading={state.isLoading}
      isSuccess={!!state.data}
    />
  );
};

export default EmailAuthResultContainer;
