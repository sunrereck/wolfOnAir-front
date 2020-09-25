import React, { memo } from "react";
import styled from "styled-components";

import Fade from "@/components/layout/Fade";
import Portal from "@/components/layout/Portal";
import Button from "../../atoms/Button";

interface ConfirmProps {
  children: React.ReactNode;
  isShown: boolean;
  title: string;
  onCancel: () => void;
  onClick: () => void;
  onClose: () => void;
}

function Confirm({
  children,
  isShown,
  title,
  onCancel,
  onClick,
  onClose,
}: ConfirmProps): JSX.Element {
  return (
    <Portal>
      <Fade isShown={isShown} timeout={200}>
        <Modal>
          <Title>{title}</Title>
          <Body>{children}</Body>
          <ButtonWrap>
            <Button type="button" variant="outlined" onClick={onCancel}>
              취소
            </Button>
            <Button type="button" onClick={onClick}>
              확인
            </Button>
          </ButtonWrap>
        </Modal>
        <BackGround onClick={onClose} />
      </Fade>
    </Portal>
  );
}

const BackGround = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  user-select: none;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  min-width: 300px;
  width: 85%; 
  width: calc(100% - 32px);
  max-width: 500px;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.whiteColor};
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`;

const Body = styled.div`
  margin-bottom: 1rem;

  p {
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  
  button {
    width: 100px;
    
    &:first-of-type {
      margin-right: 0.25rem;
    }

    &:last-of-type {
      margin-left: 0.25rem;
    }
  }
`;

export default memo(Confirm);
