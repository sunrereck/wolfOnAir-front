import React from 'react';
import styled from 'styled-components';

import { Room } from '@/models/room';

import Button from '@/components/atoms/Button';

interface RoomListProps {
  rooms: Room[];
}

function RoomList({
  rooms
}: RoomListProps) {
  return (
    <Wrapper>
      <Rooms>
        {
          rooms.length > 0 ? <div>방있음</div> : <div>방음슴</div>
        }
      </Rooms>
      <StyledButton type="button" color="primary" width="6.25rem" height="2.5rem">
        방 만들기
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  flex: 2;
`;

const Rooms = styled.div`
  overflow-y: scroll;
  width: 100%;
  max-width: 42rem;
  margin: 0 auto 1rem;
`;

const StyledButton = styled(Button)`
  position: absolute;
  font-size: 0.875rem;
  right: 0;
  bottom: 1rem;
`;

export default RoomList;