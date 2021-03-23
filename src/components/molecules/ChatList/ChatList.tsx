import React, { memo, useCallback, useEffect, useRef } from "react";
import { AutoSizer, List } from "react-virtualized";
import styled from "styled-components";

import { Chat } from "@/models/chat";

import Message from "../Message";

import "react-virtualized/styles.css";

interface ChatListProps {
  chatList: Chat[];
}

const ChatList = ({
  chatList,
}: ChatListProps): JSX.Element => {
  const listEl = useRef<List>(null);

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
    if (!listEl || !listEl.current) {
      return;
    }

    listEl.current.scrollToRow(chatList.length);

  }, [chatList.length]);

  return (
    <Wrapper>
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => (
          <>
            <ListWrapper width={width}>
              <StyledList
                ref={listEl}
                rowCount={chatList.length}
                rowHeight={28}
                rowRenderer={rowRenderer}
                width={width}
                height={150}
              />
            </ListWrapper>
          </>
        )}
      </AutoSizer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default memo(ChatList);
