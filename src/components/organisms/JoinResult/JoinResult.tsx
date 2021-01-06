import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Heading from '@/components/atoms/Heading';
import Alert from '@/components/molecules/Alert';

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
      <StyledHeading>회원가입 완료</StyledHeading>
      <Wrapper>
        {
          isSuccess ? (
            <p>
              가입하신 이메일 주소
              <br />
              <strong>{email}</strong>로 인증 메일을 보내드렸습니다.
              <br />
              이메일 인증을 완료해주세요.
              <br />
              <br />
              혹시 인증 메일을 못 받으셨나요?
            </p>
          ) : (   
            <p>
              앗, 회원가입은 성공하였으나 가입하신 이메일 주소
              <br />
              <strong>{email}</strong>로 인증 메일 발송에는 실패하였습니다.
              <br />
              아래의 '인증메일 재전송' 버튼을 눌러 이메일 인증을 완료해주세요.
            </p>                    
          )
        }
        <ButtonWrapper>
          <Button
            type="button"
            onClick={onClickSendJoinAuthEmail}
            disabled={isLoadingSendJoinAuthEmail}
          >
            {isLoadingSendJoinAuthEmail ? "인증메일 전송 중..." : "인증메일 재전송"}
          </Button>
          <Button
            type="button"
            onClick={onClickSendJoinAuthHelpEmail}
            disabled={isLoadingSendJoinAuthHelpEmail}
            variant="outlined"
          >
            {isLoadingSendJoinAuthHelpEmail ? '관리자에게 문의 메일 전송 중...' : '관리자에게 문의메일 보내기'}
          </Button>
        </ButtonWrapper>
      </Wrapper>
      <Alert 
        isShown={isShownAlert}
        title="메일 발송 완료"
        onClick={onToggleAlert}
        onClose={onToggleAlert}
      >
        {alertMessage}
      </Alert>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
  font-size: 1.25rem;
  text-align: center;
`;

const Wrapper = styled.div``;

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
