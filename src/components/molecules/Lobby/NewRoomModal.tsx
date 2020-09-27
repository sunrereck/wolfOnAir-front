import React, { memo } from 'react';
import styled from "styled-components";

import Input from "@/components/components/Input";
import Confirm from "@/components/molecules/Confirm";

interface NewRoomModalProps {
  isShown: boolean;
  roomTitle: string;
  onCancel: () => void;
  onChangeRoomTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onClose: () => void;
  onOpen: () => void;
}

function NewRoomModal({
  isShown,
  roomTitle,
  onCancel,
  onChangeRoomTitle,
  onClick,
  onClose,
  onOpen,
}:NewRoomModalProps): JSX.Element {
  return (
    <Confirm
    isShown={isShown}
    title="방 만들기"
    onCancel={onCancel}
    onClick={onClick}
    onClose={onClose}
  >
    <NewRoom>
      <div>
        <span>방제</span> 
        <Input type="text" value={roomTitle} onChange={onChangeRoomTitle} />
      </div>
      <div>
        <span>모드</span>
        <select>
          <option>마피아</option>
        </select>
      </div>
    </NewRoom>
  </Confirm>

  );
}


const NewRoom = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 350px;

  div {
    display: flex;
    height: 30px;
    align-items: center;

    &:first-of-type {
      margin-bottom: 1rem;
    }
  }

  span {
    display: inline-block;
    width: 50px;
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  input, select {
    height: 100%;
    width: 75%;
    width: calc(100% - 50px);
  }
`;

export default memo(NewRoomModal);