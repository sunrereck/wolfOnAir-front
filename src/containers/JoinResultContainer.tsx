import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { sendJoinAuthEmail } from '@/api/user';
import { sendJoinAuthHelpEmail } from '@/api/help';

import { getUrlQuery } from '@/utils/commons';

import useAlert from '@/hooks/useAlert';
import useRequest from "@/hooks/useRequest";

import JoinResult from '@/components/organisms/JoinResult';

function JoinResultContainer(): React.ReactElement {
  const location = useLocation();
  const { email }: {
    email: string;
  } = useParams();
  const [
    isShownAlert,
    alertMessage,
    onToggleAlert,
    onSetAlertMessage
  ] = useAlert();
  const [
    sendJoinAuthEmailData,
    sendAuthEmailError,
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
  const query = getUrlQuery(location.search);

  const onClickSendJoinAuthEmail = () => {
    onSendJoinAuthEmail(email);
  }

  const onClickSendJoinAuthHelpEmail = () => {
    onSendJoinAuthHelpEmail(email);
  }

  useEffect(() => {
    if (!sendJoinAuthEmailData && !sendJoinAuthHelpEmailData) {
      return;
    }

    if (sendJoinAuthEmailData) {
      onSetAlertMessage(`가입하신 이메일 주소 ${email}로 인증메일을 보내드렸습니다.\n이메일 인증을 완료해주세요.`);
      onToggleAlert();
      onResetSendJoinAuthEmail();
      return;
    }

    if (sendJoinAuthHelpEmailData) {
      onSetAlertMessage(`관리자에게 문의메일을 보냈습니다.\n빨리 문제가 해결될 수 있도록 처리하겠습니다.`);
      onToggleAlert();
      onResetSendJoinAuthHelpEmail();
    }
  }, [
    sendJoinAuthEmailData,
    sendJoinAuthHelpEmailData,
    onResetSendJoinAuthEmail,
    onResetSendJoinAuthHelpEmail
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
