import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Textarea = ({ width, onChange, value }: any) => {
  const DEFAULT_HEIGHT = 24;
  const textEl = useRef(null);
  
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

    //@ts-ignore
    textEl.current.style.height = `${DEFAULT_HEIGHT}px`;

    //@ts-ignore
    const { scrollHeight } = textEl.current;

    //@ts-ignore
    textEl.current.style.height =
      scrollHeight > DEFAULT_HEIGHT
        ? `${scrollHeight}px`
        : `${DEFAULT_HEIGHT}px`;
  };

  return (
    <TextareaWrapper
      width={width}
      ref={textEl}
      value={value}
      onChange={onChange}
    />
  );
};

const TextareaWrapper = styled.textarea<{ width: string }>`
  overflow: hidden;
  display: block;
  width: ${({ width }) => width};
  border: 0;
  font-size: 1rem;
  outline: none;
  line-height: 1.5;
  user-select: none;
  resize: none;
`;

export default Textarea;
