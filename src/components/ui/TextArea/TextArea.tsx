import React, { useRef } from "react";
import styled from "styled-components";

const TextArea = ({ values }) => {
  const textEl = useRef(null);

  return (
    <TextAreaWrapper>
      <textarea ref={textEl}></textarea>
      <GhostTextArea>{values}</GhostTextArea>
    </TextAreaWrapper>
  );
};
const TextAreaWrapper = styled.div`
  position: relative;

  textarea {
    overflow-x: hidden;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-top: 1rem;
  }
`;

const GhostTextArea = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default TextArea;
