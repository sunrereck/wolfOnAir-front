import React, { useEffect, useRef } from 'react';
import { AutoSizer, List } from "react-virtualized";
import styled from 'styled-components';

import { Chat } from "@/interface/chat";

import ChatMessage from '@/components/molecules/ChatMessage';

import 'react-virtualized/styles.css';

interface ChatMessagesProps {
  chats: Chat[];
}

function ChatMessages({
  chats
}: ChatMessagesProps): React.ReactElement {
  const listEl = useRef<List>(null);

  const rowRenderer = ({
    key,
    index,
    style
  }: {
    index: number;
    key: string;
    style: Record<string, any>
  }) => (
    <ChatMessage 
      key={key}
      color={chats[index].color}
      message={chats[index].message}
      style={style}
      type={chats[index].type}
      userName={chats[index].userName}/>
  );

  useEffect(() => {
    if (listEl && listEl.current) listEl.current.scrollToRow(chats.length);
  }, [chats.length])

  return (
    <Wrapper>
      <AutoSizer>
        {({ width, height }: { 
          width: number;
          height: number;
        }) => (
            <List
              rowHeight={30}
              height={height}
              width={width}
              ref={listEl}
              rowCount={chats.length}
              rowRenderer={rowRenderer} />
          )}      
        </AutoSizer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  flex: 2;
  border: 1px solid ${({theme}) => theme.primaryColor};
`;

export default ChatMessages;