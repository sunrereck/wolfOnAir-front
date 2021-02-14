import React from 'react';
import styled from 'styled-components';

import { RoomModeTypes } from "@/models/Room";

import Fade from "@/components/atoms/Fade";
import Input from '@/components/atoms/Input';
import Portal from "@/components/atoms/Portal";
import Select from '@/components/atoms/Select';
import Option from '@/components/atoms/Option';

interface NewRoomModalProps {
  isShowing: boolean;
  peopleCount: number;
  roomMode: RoomModeTypes;
  roomTitle: string;
  onSelectRoom: () => void;
  onSelectPeopleCount: () => void;
 }

function NewRoomModal({
  isShowing,
  peopleCount,
  roomMode,
  roomTitle,
  onSelectRoom,
  onSelectPeopleCount
}: NewRoomModalProps): React.ReactElement {

  return (
    <Portal>
      <Fade isShowing={isShowing} timeout={200}>
        <Wrapper>
          <div>
            방제: 
            <Input type="text" value={roomTitle}/>
          </div>
          <div>
            타입
            <Select value={roomMode} onChange={onSelectRoom}>
              <Option value="wareWolf" text="웨어울프"/>
            </Select>
          </div>
          <div>
            인원
            <Select value={peopleCount} onChange={onSelectPeopleCount}>
              <Option value={3} text="3"/>
              <Option value={5} text="5"/>
              <Option value={8} text="8"/>
            </Select>
          </div>
        </Wrapper>
      </Fade>
    </Portal>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

export default NewRoomModal;