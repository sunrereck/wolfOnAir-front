import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";

const Wrapper = styled.section`
  p {
    margin: 1rem auto;
    padding: 1rem;
    text-align: center;
  }
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

interface JoinResultProps {
  email: string;
  isAuthMailLoading: boolean;
  isHelpMailLoading: boolean;
  onSendAuthMail: () => void;
  onSendHelpMail: () => void;
}

const JoinResult = ({
  email,
  isAuthMailLoading,
  isHelpMailLoading,
  onSendAuthMail,
  onSendHelpMail
}: JoinResultProps): JSX.Element => {
  return (
    <>
      <Heading>회원가입 완료</Heading>
      <Wrapper>
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
        <ButtonWrapper>
          <Button
            type="button"
            onClick={onSendAuthMail}
            disabled={isAuthMailLoading}
          >
            {isAuthMailLoading ? "인증메일 전송 중..." : "인증메일 재전송"}
          </Button>
          <Button
            type="button"
            onClick={onSendHelpMail}
            disabled={isHelpMailLoading}
            variant="outlined"
          >
            {isHelpMailLoading ? '관리자에게 문의 메일 전송 중...' : '관리자에게 문의메일 보내기'}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default JoinResult;
