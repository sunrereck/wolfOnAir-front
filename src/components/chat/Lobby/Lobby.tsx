import React from "react";
import styled from "styled-components";

import Alert from '@/components/ui/Alert';
import ChatList from "./ChatList";
import EmptyChat from "./EmptyChat";
import LobbyRoom from "./LobbyRoom";

interface LobbyProps {
  chatList: any[];
  isError: boolean;
  onResetError: () => void;
}

const Lobby = ({
  chatList,
  isError,
  onResetError,
}: LobbyProps): JSX.Element => {
  return (
    <>
      <LobbyWrapper>
        {/* {chatList.length > 0 ? <ChatList /> : <EmptyChat />} */}
        <LobbyRoom chatList={chatList}/>
      </LobbyWrapper>
      <Alert
        isShown={isError}
        onClick={onResetError}
        onClose={onResetError}
        title="로비 접속 실패"
      >
        로비에 접속할 수 없습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </Alert>
    </>
  );
};

const LobbyWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
`;

export default Lobby;
