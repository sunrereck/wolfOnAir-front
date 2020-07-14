import React, { memo } from "react";
import styled from "styled-components";

import Button from '@/components/ui/Button'; 
import Textarea from "@/components/ui/Textarea";

import "react-virtualized/styles.css";

interface LobbyChatInputProps {
  message: string;
  width: number;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

const LobbyChatInput = ({
  message,
  width,
  onChangeMessage,
  onSendMessage
}: LobbyChatInputProps): JSX.Element => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    onSendMessage();
  };

  return (
    <Wrapper width={width}>
      <Textarea value={message} onChange={onChangeMessage} onKeyDown={onKeyDown} />
      <Button type="button" onClick={onSendMessage} size="small">
        채팅
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  min-width: 300px;
  max-width: 700px;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 4.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  border: 1px solid ${({theme}) => theme.primaryColor};
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

export default memo(LobbyChatInput);
