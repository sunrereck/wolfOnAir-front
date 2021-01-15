import React from 'react';
import styled from 'styled-components';
import { AxiosResponse, AxiosError } from 'axios';

import { getErrorMessage } from '@/utils/errors';

import Button from '@/components/atoms/Button';
import JoinWrapper from '@/components/molecules/JoinWrapper';

interface JoinUserAuthResultProps {
  updateJoinUserAuthDate: AxiosResponse['data'] | null,
  updateJoinUserAuthError: AxiosError | null,
  isLoadingJoinUserLoading: boolean
}

function getTitle(isSuccess: boolean, isFail: boolean, isLoading: boolean) {
    if (isLoading) return '이메일 인증 중...';

    if (isFail) return '이메일 인증 실패';

    if (isSuccess) return '이메일 인증 성공';

    return '';
}

function JoinUserAuthResult ({
  updateJoinUserAuthDate,
  updateJoinUserAuthError,
  isLoadingJoinUserLoading
}: JoinUserAuthResultProps): React.ReactElement {
  return (
    <JoinWrapper title={getTitle(!!updateJoinUserAuthDate, !!updateJoinUserAuthError, isLoadingJoinUserLoading)}>
      {
        !!updateJoinUserAuthDate && (
          <>
            <JoinUserAuthResultText>
              이메일 인증에 성공하였습니다.
            </JoinUserAuthResultText>
            <StyledButton
              color="primary"
              variant="contained">
              로그인하러 가기
            </StyledButton>
          </>
        )
      }
      {
        !!updateJoinUserAuthError && (
          <JoinUserAuthResultText>
            {getErrorMessage(updateJoinUserAuthError)}
          </JoinUserAuthResultText>
        )
      }{
        isLoadingJoinUserLoading && (
          <JoinUserAuthResultText>
            잠시만 기다려주세요. 이메일을 인증하고 있습니다.
          </JoinUserAuthResultText>
        )
      }
    </JoinWrapper>
  );
}

const JoinUserAuthResultText = styled.p`
  line-height: 1.5;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default JoinUserAuthResult;
