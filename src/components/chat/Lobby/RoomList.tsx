import React, { memo, useCallback, useEffect, useRef } from "react";
import { AutoSizer, List } from "react-virtualized";
import styled from "styled-components";

import Message from "../Message";

import "react-virtualized/styles.css";

interface RoomListProps {
  roomList: any[];
}

const RoomList = ({ roomList }: RoomListProps): JSX.Element => {
  return (
    <Wrapper>
      <ListWrapper>
        {roomList.map(({ roomTitle, status, count, maxCount }) => {
          return (
            <Room>
              <RoomName>{roomTitle}</RoomName>
              <RoomReady>{status === 0 ? "대기중" : "게임중"}</RoomReady>
              <RoomLimit>{`${count}/${maxCount}`}</RoomLimit>
            </Room>
          );
        })}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  min-height: 150px;
  height: 350px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 2px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const Room = styled.div`
  border: 1px solid #000000;
  padding: 0.5rem;
  margin: 0.5rem;
  flex-basis: calc(50% - 1rem);
  display: flex;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const RoomName = styled.div`
  margin-right: auto;
  width: 195px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const RoomReady = styled.div`
  margin-right: auto;
`;

const RoomLimit = styled.div`
  margin-left: auto;
`;

export default memo(RoomList);
