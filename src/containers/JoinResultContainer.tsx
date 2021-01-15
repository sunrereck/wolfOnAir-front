import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { sendJoinAuthEmail } from '@/api/user';
import { sendJoinAuthHelpEmail } from '@/api/help';

import { getUrlQuery } from '@/utils/commons';

import useAlert from '@/hooks/useAlert';
import useRequest from "@/hooks/useRequest";

import JoinResult from '@/components/organisms/JoinResult';

function JoinResultContainer(): React.ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { email }: {
    email: string;
  } = useParams();
  const query = getUrlQuery(location.search);
  const [
    isShownAlert,
    alertMessage,
    onToggleAlert,
    onSetAlertMessage
  ] = useAlert();
  const [
    sendJoinAuthEmailData,
    sendJoinAuthEmailError,
    isLoadingSendJoinAuthEmail,
    onSendJoinAuthEmail,
    onResetSendJoinAuthEmail
  ] = useRequest(sendJoinAuthEmail, '' as string, true);
  const [
    sendJoinAuthHelpEmailData,
    sendJoinAuthHelpEmailError,
    isLoadingSendJoinAuthHelpEmail,
    onSendJoinAuthHelpEmail,
    onResetSendJoinAuthHelpEmail
  ] = useRequest(sendJoinAuthHelpEmail, '' as string, true);

  const onClickSendJoinAuthEmail = () => {
    onSendJoinAuthEmail(email);
  }

  const onClickSendJoinAuthHelpEmail = () => {
    onSendJoinAuthHelpEmail(email);
  }

  // componentDidUpdate - sendJoinAuthEmailData, sendJoinAuthHelpEmailData
  useEffect(() => {
    if (!sendJoinAuthEmailData && !sendJoinAuthHelpEmailData) {
      return;
    }

    if (sendJoinAuthEmailData) {
      onResetSendJoinAuthEmail();

      history.replace(`${location.pathname}?result=success`);

      return;
    }

    if (sendJoinAuthHelpEmailData) {
      onSetAlertMessage(`관리자에게 문의메일을 발송했습니다.\n빨리 문제가 해결될 수 있도록 처리하겠습니다.`);
      onToggleAlert();
      onResetSendJoinAuthHelpEmail();
    }
  }, [
    email,
    history,
    location.pathname,
    sendJoinAuthEmailData,
    sendJoinAuthHelpEmailData,
    onResetSendJoinAuthEmail,
    onResetSendJoinAuthHelpEmail,
    onSetAlertMessage,
    onToggleAlert
  ]);

  // componentDidUpdate - sendJoinAuthEmailData, sendJoinAuthHelpEmailData
  useEffect(() => {
    if (!sendJoinAuthEmailError && !sendJoinAuthHelpEmailError) {
      return;
    }

    if (sendJoinAuthEmailError) {
      onSetAlertMessage(`인증메일 전송에 실패하였습니다.\n잠시 후 다시 시도해주세요.`);
      onToggleAlert();
      onResetSendJoinAuthEmail();
      return;
    }

    if (sendJoinAuthHelpEmailError) {
      onSetAlertMessage(`문의메일 전송에 실패하였습니다.\n잠시 후 다시 시도해주세요.`);
      onToggleAlert();
      onResetSendJoinAuthHelpEmail();
    }
  }, [
    sendJoinAuthEmailError,
    sendJoinAuthHelpEmailError,
    onResetSendJoinAuthEmail,
    onResetSendJoinAuthHelpEmail,
    onSetAlertMessage,
    onToggleAlert
  ]);

  return (
    <JoinResult 
      alertMessage={alertMessage}
      email={email}
      isLoadingSendJoinAuthEmail={isLoadingSendJoinAuthEmail}
      isLoadingSendJoinAuthHelpEmail={isLoadingSendJoinAuthHelpEmail}
      isSuccess={!!query && query.result === 'success'}
      isShownAlert={isShownAlert}
      onClickSendJoinAuthEmail={onClickSendJoinAuthEmail}
      onClickSendJoinAuthHelpEmail={onClickSendJoinAuthHelpEmail}
      onToggleAlert={onToggleAlert}
    />
  )
}

export default JoinResultContainer;
