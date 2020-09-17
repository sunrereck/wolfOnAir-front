import React, { memo } from "react";
import styled from "styled-components";

import Button from '@/components/ui/Button'; 
import Textarea from "@/components/ui/Textarea";

import "react-virtualized/styles.css";

interface ChatInputProps {
  message: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

const ChatInput = ({
  message,
  onChangeMessage,
  onSendMessage
}: ChatInputProps): JSX.Element => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    onSendMessage();
  };

  return (
    <Wrapper>
      <Textarea value={message} onChange={onChangeMessage} onKeyDown={onKeyDown} />
      <Button type="button" onClick={onSendMessage} style={{width: "100px"}}>
        채팅
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 300px;
  max-width: 700px;
  margin-top: 0.5rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;

  textarea {
    width: 100%;
    padding-top: 0.5rem;
    padding-right: 4.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    border: 1px solid ${({theme}) => theme.primaryColor};  
    border-radius: 2px;
  }

  button {
    position: absolute;
    width: 50px;
    height: 28px;
    margin-top: -14px;
    right: 1rem;
    top: 50%;
    
  }
`;

export default memo(ChatInput);
