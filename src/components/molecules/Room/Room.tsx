import React, { memo } from "react";
import styled from "styled-components";

import ChatInput from "@/components/molecules/ChatInput";
import ChatList from "@/components/molecules/ChatList";
import UserList from "./UserList";

function Room() {
  return (
    <Wrapper>
      <RoomWrapper>
        <UserList />
        <ChatList chatList={[]} />
      </RoomWrapper>
      {/* <ChatInput
        message=""
        onChangeMessage={() => {}}
        onSendMessage={() => {}}
      /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${({theme}) => theme.medium}) {
    flex-direction: row;
  }
`;

export default memo(Room);
