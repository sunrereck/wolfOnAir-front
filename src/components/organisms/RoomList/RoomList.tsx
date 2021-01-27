import React from 'react';
import styled from 'styled-components';

import { Room } from '@/interface/room';

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 1rem;
  flex: 2;
`;

const Rooms = styled.div`
  overflow-y: scroll;
  width: 100%;
  max-width: 42rem;
  margin: 0 auto 1rem;
`;

export default RoomList;