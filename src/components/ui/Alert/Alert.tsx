import React from "react";
import styled from "styled-components";

import Button from "../Button";
import Fade from "../../layout/Fade ";
import Portal from "../../layout/Portal";

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
  text-align: center;
`;

const Body = styled.div`
  margin-bottom: 1rem;

  p {
    font-size: 1rem;
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
  onClick: () => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
}

const Alert = ({
  children,
  onClick,
  onClose,
  isOpen,
  title
}: AlertProps): JSX.Element | null => {
  return (
    <>
      <Portal>
        <Fade isOpen={isOpen} timeout={200}>
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
    </>
  );
};

Alert.defaultProps = {
  children: null,
  title: ""
};

export default Alert;
