import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Textarea = ({ width, onChange, value }: any) => {
  const DEFAULT_HEIGHT = 40;
  const textEl = useRef(null);

  useEffect(() => {
    if (!textEl || !textEl.current) {
      return;
    }

    //@ts-ignore
    textEl.current.style.height = `${DEFAULT_HEIGHT}px`;

    //@ts-ignore
    const { scrollHeight } = textEl.current;

    //@ts-ignore
    textEl.current.style.height = scrollHeight > DEFAULT_HEIGHT ? `${scrollHeight}px` : `${DEFAULT_HEIGHT}px`;
  }, [value]);

  return <TextareaWrapper width={width} ref={textEl} value={value} onChange={onChange} />;
};

const TextareaWrapper = styled.textarea<{width: string}>`
  overflow: hidden;
  display: block;
  width: ${({width}) => width};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 0;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
`;

export default Textarea;
