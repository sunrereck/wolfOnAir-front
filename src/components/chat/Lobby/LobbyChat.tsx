import React, { useCallback, useEffect, useRef } from "react";
import { AutoSizer, List } from "react-virtualized";
import styled from "styled-components";

import { Chat } from "@/interface/chat";

import Textarea from "@/components/ui/Textarea";
import Message from "../Message";

import "react-virtualized/styles.css";

interface LobbyRoomProps {
  chatList: any[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

const LobbyChat = ({
  chatList,
  value,
  onChange,
  onSendMessage,
}: LobbyRoomProps): JSX.Element => {
  const lobbyEl = useRef<List>(null);

  const rowRenderer = useCallback(
    ({
      key,
      index,
      isScrolling,
      isVisible,
      style,
    }: {
      index: number;
      isScrolling: boolean;
      isVisible: boolean;
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    onSendMessage();
  };

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
                rowHeight={24}
                rowRenderer={rowRenderer}
                width={width}
                height={150}
              />
          </ListWrapper>
            <LobbyRoomInput width={width}>
              <Textarea
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
              <button type="button" onClick={onSendMessage}>
                채팅
              </button>
            </LobbyRoomInput>
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
  padding: 0.5rem;
  border: 1px solid #000000;
`;

const StyledList = styled(List)`
  min-width: 300px;
  max-width: 700px;

  span {
    min-width: 300px;
  }
`;

const LobbyRoomInput = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  min-width: 300px;
  max-width: 700px;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 4.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  border: 1px solid #000000;
  border-radius: 2px;

  textarea {
    width: 100%;
  }

  button {
    position: absolute;
    width: 50px;
    height: 28px;
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

export default LobbyChat;
