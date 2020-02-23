import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "@/components/ui/Button";
import UserTitle from "../UserTitle";

const Wrapper = styled.form`
  width: 100%;
  margin: 0 auto;
  max-width: 440px;
  text-align: center;

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  button {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

interface JoinFailProps {
  error: any;
}

const JoinFail = ({ error }: JoinFailProps): JSX.Element => {
  const [isClientError, setClientError] = useState(true);

  useEffect(() => {
    setClientError(error && error.response && error.response.status === 400);
  }, [error]);

  return (
    <>
      <UserTitle>이메일 인증 실패</UserTitle>
      <Wrapper>
        {isClientError ? (
          <p>{error.response.data.reason}</p>
        ) : (
          <p>
            앗, 이메일 인증에 실패하였습니다 ㅠㅠ...
            <br />
            문제가 지속되면 관리자에게 문의 부탁드립니다.
          </p>
        )}

        {!isClientError && <Button type="button">인증 이메일 재전송</Button>}
        <Button type="button" color="primaryOutline">
          관리자에게 문의하기
        </Button>
      </Wrapper>
    </>
  );
};

export default JoinFail;
