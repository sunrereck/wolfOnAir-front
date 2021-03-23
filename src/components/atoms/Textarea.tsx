import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaEl?: React.RefObject<HTMLInputElement>;
  width?: string;
}

function Textarea ({ 
  textareaEl,
  value,
  width, 
  ...props 
}: TextareaProps): React.ReactElement {
  const DEFAULT_HEIGHT = 43;
  const textEl = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    window.addEventListener('resize', onChangeSize);

    return () => {
      window.removeEventListener('resize', onChangeSize);
    }
  }, []);

  useEffect(() => {
    onChangeSize();
  }, [value]);

  const onChangeSize = () => {
    if (!textEl || !textEl.current) {
      return;
    }

    textEl.current.style.height = `${DEFAULT_HEIGHT}px`;

    const { scrollHeight } = textEl.current;

    textEl.current.style.height =
      scrollHeight > DEFAULT_HEIGHT
        ? `${scrollHeight}px`
        : `${DEFAULT_HEIGHT}px`;
  };

  return (
    <Wrapper
      width={width}
      ref={textEl}
      value={value || ''}
      {...props}
    />
  );
};

const Wrapper = styled.textarea<{ width?: string }>`
  overflow-y: hidden;
  width: ${({ width }) => width || '100%'};
  border: 0;
  padding: 1rem;
  font-size: 1rem;
  outline: none;
  line-height: 1.5;
  user-select: none;
  resize: none;
`;

export default Textarea;
