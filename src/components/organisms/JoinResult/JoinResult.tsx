import React from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import NewLineText from '@/components/atoms/NewLineText';
import Alert from '@/components/molecules/Alert';
import JoinWrapper from '@/components/molecules/JoinWrapper';

interface JoinResultProps {
  alertMessage: string;
  email: string;
  isLoadingSendJoinAuthEmail: boolean;
  isLoadingSendJoinAuthHelpEmail: boolean;
  isSuccess: boolean;
  isShownAlert: boolean;
  onClickSendJoinAuthEmail: () => void;
  onClickSendJoinAuthHelpEmail: () => void;
  onToggleAlert: () => void;
}

function JoinResult ({
  alertMessage,
  email,
  isLoadingSendJoinAuthEmail,
  isLoadingSendJoinAuthHelpEmail,
  isSuccess,
  isShownAlert,
  onClickSendJoinAuthEmail,
  onClickSendJoinAuthHelpEmail,
  onToggleAlert
}: JoinResultProps): React.ReactElement {
  return (
    <>
    <JoinWrapper title="회원가입 완료">
      {
        isSuccess ? (
          <JoinResultText>
            가입하신 이메일 주소
            <br />
            <strong>{email}</strong>로 인증 메일을 보내드렸습니다.
            <br />
            이메일 인증을 완료해주세요.
            <br />
            <br />
            혹시 인증 메일을 못 받으셨나요?
          </JoinResultText>
        ) : (   
          <JoinResultText>
            앗, 회원가입은 성공하였으나 가입하신 이메일 주소
            <br />
            <strong>{email}</strong>로 인증 메일 발송에는 실패하였습니다.
            <br />
            아래의 '인증메일 재전송' 버튼을 눌러 이메일 인증을 완료해주세요.
          </JoinResultText>                    
        )
      }
      </JoinWrapper>
      <ButtonWrapper>
        <Button
          type="button"
          onClick={onClickSendJoinAuthEmail}
          disabled={isLoadingSendJoinAuthEmail}>
          {isLoadingSendJoinAuthEmail ? "인증메일 전송 중..." : "인증메일 재전송"}
        </Button>
        <Button
          type="button"
          onClick={onClickSendJoinAuthHelpEmail}
          disabled={isLoadingSendJoinAuthHelpEmail}
          variant="outlined">
          {isLoadingSendJoinAuthHelpEmail ? '관리자에게 문의 메일 전송 중...' : '관리자에게 문의메일 보내기'}
        </Button>
      </ButtonWrapper>
      <Alert 
        isShown={isShownAlert}
        title="메일 발송 결과"
        onClick={onToggleAlert}
        onClose={onToggleAlert}>
        <NewLineText text={alertMessage} />
      </Alert>
    </>
  );
};

const JoinResultText = styled.p`
  margin: 1.5rem 0;
  text-align: center;
  line-height: 1.5;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 400px;

  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

export default JoinResult;
