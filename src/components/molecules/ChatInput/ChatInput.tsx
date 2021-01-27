import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from '@/components/atoms/Button'; 
import Textarea from "@/components/atoms/Textarea";

import "react-virtualized/styles.css";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const MAX_LENGTH = 40;

// interval 시간 안에 다시 호출된 함수 콜은 무시한다
function intervalCall(interval: number){
  let elapsed = true

  return (callback: Function) => {
    // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    if(!elapsed){
      return    
    }

    elapsed = false

    callback();

    setTimeout(() => {
      elapsed = true
    }, interval);
  }
}

function ChatInput ({
  onSendMessage
}: ChatInputProps): React.ReactElement {
  const [message, setMessage] = useState('');
  const ignoreTwiceKeyDownEvent = useRef<Function>(() => {});

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if ( value.length <= MAX_LENGTH) {
      setMessage(e.target.value);
    }
  }

  const onClick = () => {
    onSendMessage(message);
    setMessage('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (ignoreTwiceKeyDownEvent.current) {
        ignoreTwiceKeyDownEvent.current(() => {
          onSendMessage(message);
        })  
      }

      setMessage('');
    }
  }

  useEffect(() => {
    ignoreTwiceKeyDownEvent.current = intervalCall(1000);
  }, []);

  return (
    <Wrapper>
      <Textarea 
        placeholder="메시지 보내기"
        value={message} 
        onChange={onChangeMessage}
        onKeyDown={onKeyDown} />
      <Button type="button" onClick={onClick}>
        채팅
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  flex: 1;

  textarea {
    border: 1px solid ${({theme}) => theme.primaryColor};
    padding-right: 5rem;
  }

  button {
    position: absolute; 
    top: 1.75rem;
    right: 1rem;
    width: 45px;
    height: 30px;
  }
`;

export default ChatInput;
