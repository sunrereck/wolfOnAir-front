import React, { useCallback, useEffect, useRef } from "react";
import { AutoSizer, List } from "react-virtualized";
import styled from "styled-components";

import { Chat } from "@/interface/chat";

import Message from "../Message";
import LobbyChatInput from './LobbyChatInput';

import "react-virtualized/styles.css";

interface LobbyRoomProps {
  chatList: Chat[];
  message: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

const LobbyChat = ({
  chatList,
  message,
  onChangeMessage,
  onSendMessage,
}: LobbyRoomProps): JSX.Element => {
  const lobbyEl = useRef<List>(null);

  const rowRenderer = useCallback(
    ({
      key,
      index,
      style,
    }: {
      index: number;
      key: string;
      style: Object;
    }) => {
      const chat = chatList[index];

      return (
        <Message
          isSystem={chat.userName === "system"}
          key={key}
          message={chat.message}
          style={style}
          userName={chat.userName}
        />
      );
    },
    [chatList]
  );

  useEffect(() => {
    if (!lobbyEl || !lobbyEl.current) {
      return;
    }

    lobbyEl.current.scrollToRow(chatList.length);

  }, [chatList.length]);

  return (
    <LobbyRoomWrapper>
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => (
          <>
            <ListWrapper width={width}>
              <StyledList
                ref={lobbyEl}
                rowCount={chatList.length}
                rowHeight={28}
                rowRenderer={rowRenderer}
                width={width}
                height={150}
              />
            </ListWrapper>
            <LobbyChatInput 
              message={message}
              width={width}
              onChangeMessage={onChangeMessage}
              onSendMessage={onSendMessage}
            />
          </>
        )}
      </AutoSizer>
    </LobbyRoomWrapper>
  );
};

const LobbyRoomWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const ListWrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  border: 1px solid ${({theme}) => theme.primaryColor};
  border-radius: 2px;
`;

const StyledList = styled(List)`
  min-width: 300px;
  max-width: 700px;

  span {
    width: 100%;
    padding: 0.25rem 0.5rem;

    &:first-of-type {
      padding-top: 0.5rem;
    }
  }
`;

export default LobbyChat;
