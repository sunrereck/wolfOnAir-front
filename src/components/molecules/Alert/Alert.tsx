import React, { memo } from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Fade from "@/components/atoms/Fade";
import Portal from "@/components/atoms/Portal";

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
  width: 300px;
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
  button {
    width: 150px;
    margin: 0 auto;
  }
`;

interface AlertProps {
  children: React.ReactNode;
  isShown: boolean;
  onClick: () => void;
  onClose: () => void;
  title: string;
}

const Alert = ({
  children,
  isShown,
  onClick,
  onClose,
  title,
}: AlertProps): JSX.Element | null => {
  return (
    <Portal>
      <Fade isShown={isShown} timeout={200}>
        <Modal>
          <Title>{title}</Title>
          <Body>
            <p>{children}</p>
          </Body>
          <ButtonWrap>
            <Button type="button" onClick={onClick}>
              확인
            </Button>
          </ButtonWrap>
        </Modal>
        <BackGround onClick={onClose} />
      </Fade>
    </Portal>
  );
};

Alert.defaultProps = {
  children: null,
  title: "",
};

export default memo(Alert);
